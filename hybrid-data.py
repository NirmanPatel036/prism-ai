import json
import pandas as pd
from google import genai
from datasets import load_dataset
import matplotlib.pyplot as plt
from tqdm import tqdm

# --- CONFIGURATION ---
GEMINI_API_KEY = "AIzaSyDC_VjE7hEZZ1ocQcKV8HP26tsAgid3UD8"
client = genai.Client(api_key=GEMINI_API_KEY)

# --- 1. SEED DATA CURATION ---
print("Loading Seed Datasets...")

# A. Legal Seed - Using alternative dataset without loading scripts
legal_data = load_dataset("lex_glue", "unfair_tos", split="train").to_pandas()
# Extract first label from array and map to meaningful text
legal_data['label_text'] = legal_data['labels'].apply(
    lambda x: "Potentially Unfair" if (isinstance(x, list) and len(x) > 0 and x[0] in [1, 2, 3, 4, 5, 6, 7, 8]) else "Fair"
)
legal_seeds = pd.DataFrame({
    "category": "Legal",
    "instruction": "Identify if the following contract clause is potentially unfair.",
    "input": legal_data['text'],
    "output": legal_data['label_text'],
    "explanation": "Legal compliance check for unfair contract terms."
}).head(100)

# B. PII Seed
pii_data = load_dataset("ai4privacy/pii-masking-65k", split="train").to_pandas()
# Use first two columns as input/output
pii_seeds = pd.DataFrame({
    "category": "PII",
    "instruction": "Identify and classify PII in the following text.",
    "input": pii_data.iloc[:, 0].astype(str),  # First column (original text)
    "output": pii_data.iloc[:, 1].astype(str) if len(pii_data.columns) > 1 else "PII detected and masked", 
    "explanation": "PII detection and masking for privacy compliance."
}).head(100)

# C. Ethics Seed
ethics_data = load_dataset("anthropic/hh-rlhf", split="train").to_pandas()
ethics_seeds = pd.DataFrame({
    "category": "Ethics",
    "instruction": "Evaluate this conversation for ethical and safe responses.",
    "input": ethics_data['chosen'].str[:200],
    "output": "Ethical response maintained.",
    "explanation": "Safety alignment for ethical AI behavior."
}).head(100)

# --- 2. SYNTHETIC DATA GENERATION ---
print("Generating 800 Synthetic Scenarios...")

def get_synthetic_batch(category, count=300):
    prompt = f"""
    You are a World-Class Compliance & Ethics Officer. Your task is to generate diverse training examples for an AI monitor.
    Generate exactly {count} unique JSON objects for a training set.
    CATEGORY: {category}
    
    For each example, create a JSON object with:
        1. "category": The specific risk category tag ({category}).
        2. "instruction": A clear task for the AI (e.g., "Check this email for GDPR leaks").
        3. "input": A realistic, slightly messy workplace message containing a mistake.
        4. "output": A professional, corrected version.
        5. "explanation": A one-sentence 'Why' for the correction.
    
    IMPORTANT: Return ONLY a valid JSON array. No markdown, no code blocks, no extra text.
    Return exactly this format:
    [{{"category": "{category}", "instruction": "...", "input": "...", "output": "...", "explanation": "..."}}, ...]
    
    Make each 'input' a realistic workplace mistake and 'output' the corrected version.
    Ensure diversity in scenarios - include emails, reports, messages, policies, etc.
    """
    try:
        with tqdm(total=count, desc=f"Generating {category}", unit="examples", leave=False) as pbar:
            response = client.models.generate_content(
                model='gemini-2.5-flash-lite',
                contents=prompt
            )
            
            # Clean response text
            response_text = response.text.strip()
            
            # Remove markdown code blocks if present
            if response_text.startswith('```'):
                response_text = response_text.split('```')[1]
                if response_text.startswith('json'):
                    response_text = response_text[4:]
                response_text = response_text.strip()
            
            # Find JSON array boundaries
            start_idx = response_text.find('[')
            end_idx = response_text.rfind(']')
            
            if start_idx == -1 or end_idx == -1:
                raise ValueError("No JSON array found in response")
            
            json_str = response_text[start_idx:end_idx+1]
            
            # Try to parse JSON with better error handling
            try:
                result = json.loads(json_str)
            except json.JSONDecodeError as e:
                # Try to fix common issues
                json_str = json_str.replace('\n', '\\n').replace('\r', '\\r').replace('\t', '\\t')
                result = json.loads(json_str)
            
            pbar.update(len(result))
            return result
    except Exception as e:
        print(f"✗ Error generating {category} batch: {e}")
        return []

synthetic_list = []
for cat in tqdm(["Legal", "PII", "Ethics"], desc="Generating categories", unit="category"):
    synthetic_list.extend(get_synthetic_batch(cat, count=300))

print(f"\nTotal synthetic examples generated: {len(synthetic_list)}")

df_synthetic = pd.DataFrame(synthetic_list)

# --- 3. THE MERGE & CLEANUP ---
print("Merging and Deduplicating...")

# Combine all dataframes
full_dataset = pd.concat([legal_seeds, pii_seeds, ethics_seeds, df_synthetic], ignore_index=True)

# Basic Deduplication: Remove exact duplicate inputs
full_dataset = full_dataset.drop_duplicates(subset=['input'])

# --- 4. VISUALIZATION (Diversity Check) ---
plt.figure(figsize=(8,5))
full_dataset['category'].value_counts().plot(kind='bar', color=['#4CAF50', '#2196F3', '#FF9800'])
plt.title("Hybrid Dataset Balance")
plt.ylabel("Count")
plt.show()

# --- 5. EXPORT ---
full_dataset.to_json("hybrid_final.jsonl", orient="records", lines=True)
print(f"Success! Final dataset size: {len(full_dataset)} rows saved to hybrid_final.jsonl")