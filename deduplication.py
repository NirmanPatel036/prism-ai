from datasketch import MinHash, MinHashLSH
import pandas as pd
import tqdm

def deduplicate_dataset(df, threshold=0.85):
    """
    Removes near-duplicate inputs from the dataframe.
    threshold=0.85 means if two texts are 85% similar, one is removed.
    """
    print(f"Starting deduplication on {len(df)} rows...")
    
    # 1. Initialize LSH (Locality Sensitive Hashing)
    lsh = MinHashLSH(threshold=threshold, num_perm=128)
    unique_indices = []
    
    # 2. Process each row
    for idx, row in tqdm.tqdm(df.iterrows(), total=len(df)):
        text = str(row['input']).lower()
        
        # Create MinHash signature for the text
        m = MinHash(num_perm=128)
        # Use 3-character shingles (tokens) for better fuzzy matching
        for word in text.split():
            m.update(word.encode('utf8'))
            
        # 3. Check if a similar text already exists in LSH
        result = lsh.query(m)
        
        if not result:
            # If no near-match found, it's unique!
            lsh.insert(f"idx_{idx}", m)
            unique_indices.append(idx)
            
    # 4. Filter the dataframe
    deduped_df = df.loc[unique_indices].copy()
    print(f"Deduplication complete. Removed {len(df) - len(deduped_df)} rows.")
    return deduped_df

# --- EXECUTION ---
# Load your merged data from the previous step
df_full = pd.read_json("hybrid_final.jsonl", lines=True)

# Run Deduplication
df_clean = deduplicate_dataset(df_full, threshold=0.85)

# Final Diversity Check (Sanity check after cleaning)
print("\nFinal Category Distribution:")
print(df_clean['category'].value_counts())

# Save for Phase 2 (Fine-tuning)
df_clean.to_json("hybrid_to_fine_tune.jsonl", orient="records", lines=True)