# 🛡️ PrismAI: Real-Time GDPR & Ethics Compliance Monitor

[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)
[![Python](https://img.shields.io/badge/Python-3.12-blue.svg)](https://www.python.org/downloads/)
[![Model](https://img.shields.io/badge/Model-Llama--3--8B-green.svg)](https://huggingface.co/nirmanpatel/llama-risk-compliant)
[![Modal](https://img.shields.io/badge/Deploy-Modal-orange.svg)](https://modal.com)
[![Chrome Extension](https://img.shields.io/badge/Extension-Chrome-yellow.svg)](https://developer.chrome.com/docs/extensions/)
[![Next.js](https://img.shields.io/badge/Next.js-15.1.4-black.svg)](https://nextjs.org/)
[![vLLM](https://img.shields.io/badge/vLLM-0.10.2-purple.svg)](https://github.com/vllm-project/vllm)
[![PyTorch](https://img.shields.io/badge/PyTorch-2.1.0-red.svg)](https://pytorch.org/)
[![Transformers](https://img.shields.io/badge/Transformers-4.36.0-orange.svg)](https://huggingface.co/transformers/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.109.0-teal.svg)](https://fastapi.tiangolo.com/)
[![Pydantic](https://img.shields.io/badge/Pydantic-2.5.0-pink.svg)](https://docs.pydantic.dev/)
[![PEFT](https://img.shields.io/badge/PEFT-0.7.1-blue.svg)](https://github.com/huggingface/peft)
[![Unsloth](https://img.shields.io/badge/Unsloth-2023.12-green.svg)](https://github.com/unslothai/unsloth)
[![BitsAndBytes](https://img.shields.io/badge/BitsAndBytes-0.41.3-yellow.svg)](https://github.com/TimDettmers/bitsandbytes)
[![HuggingFace](https://img.shields.io/badge/HuggingFace-Hub-yellow.svg)](https://huggingface.co/)

> **AI-powered browser extension that detects GDPR violations, PII exposure, and ethical compliance risks in real-time as you type.**

---

## 📋 Table of Contents

- [Overview](#-overview)
- [System Architecture](#-system-architecture)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Training Pipeline](#-training-pipeline)
  - [Phase 1: Dataset Creation](#phase-1-dataset-creation)
  - [Phase 2: Fine-Tuning](#phase-2-fine-tuning)
- [Deployment](#-deployment)
- [Installation](#-installation)
- [Usage](#-usage)
- [Performance](#-performance)
- [API Reference](#-api-reference)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🌟 Overview

**PrismAI** is an intelligent compliance monitoring system that analyzes text input in real-time to detect:

- **GDPR Violations**: PII exposure (names, addresses, credit cards, SSNs)
- **Privacy Risks**: Unauthorized data sharing, consent issues
- **Ethical Concerns**: Workplace bias, discrimination, inappropriate content
- **Legal Risks**: Mishandling of confidential information

The system consists of:
1. **Chrome Extension**: Monitors all text inputs across websites
2. **Fine-Tuned LLM**: Llama-3-8B specialized in compliance detection
3. **Serverless Inference**: Modal-powered GPU deployment for instant responses
4. **Landing Page**: Next.js-based showcase and documentation

---

## 🏗️ System Architecture

```
┌─────────────────────────────────────────────────────────────────────┐
│                         USER INTERACTION                            │
│  Types text in any input field (Gmail, Slack, LinkedIn, etc.)       │
└────────────────┬────────────────────────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────────────────────────┐
│                      CHROME EXTENSION                               │
│  • Monitors input events (debounced 1s)                             │
│  • Captures full text context (up to 3000 chars)                    │
│  • Sends to API endpoint                                            │
│  • Displays floating alert with copy button                         │
└────────────────┬────────────────────────────────────────────────────┘
                 │ HTTPS POST
                 ▼
┌─────────────────────────────────────────────────────────────────────┐
│                    VERCEL API ROUTE (Optional)                      │
│  • Next.js API endpoint with CORS                                   │
│  • Proxies requests to Modal (or direct to Modal)                   │
└────────────────┬────────────────────────────────────────────────────┘
                 │ HTTPS POST
                 ▼
┌─────────────────────────────────────────────────────────────────────┐
│                    MODAL SERVERLESS GPU                             │
│  ┌───────────────────────────────────────────────────┐              │
│  │  FastAPI Endpoint                                 │              │
│  │  • Receives text                                  │              │
│  │  • Formats Alpaca prompt                          │              │
│  └───────────────┬───────────────────────────────────┘              │
│                  │                                                  │
│  ┌───────────────▼───────────────────────────────────┐              │
│  │  vLLM Inference Engine (L4 GPU)                   │              │
│  │  • Loads merged model from volume                 │              │
│  │  • 4-bit quantization (BitsAndBytes)              │              │
│  │  • Context window: 4096 tokens                    │              │
│  │  • Sampling: temp=0.1, max_tokens=300             │              │
│  └───────────────┬───────────────────────────────────┘              │
│                  │                                                  │
│  ┌───────────────▼───────────────────────────────────┐              │
│  │  Modal Volume (Persistent Storage)                │              │
│  │  • Merged Llama-3-8B model (~5GB)                 │              │
│  │  • Instant cold starts (no download)              │              │
│  └───────────────────────────────────────────────────┘              │
└────────────────┬────────────────────────────────────────────────────┘
                 │ JSON Response
                 ▼
┌─────────────────────────────────────────────────────────────────────┐
│                      CHROME EXTENSION                               │
│  • Receives compliance advice                                       │
│  • Cleans response (removes echoed input)                           │
│  • Displays floating alert with risk details                        │
│  • Auto-dismisses after 3 seconds (hover to persist)                │
└─────────────────────────────────────────────────────────────────────┘
```

### Data Flow

```
User Input → Debounce (1s) → Extension → API → Modal GPU → vLLM → Response
     ↓                                                            ↓
  Full text                                              Risk analysis
  context                                                + advice
```

---

## ✨ Features

### 🔍 Real-Time Monitoring
- Monitors all text fields: input, textarea, contentEditable
- Debounced detection (1 second after typing stops)
- Handles multi-paragraph text (up to 3000 characters)
- Context-aware analysis (considers full message, not just sentences)

### 🛡️ Compliance Detection
- **PII Detection**: Names, addresses, phone numbers, emails, SSNs, credit cards
- **GDPR Violations**: Data minimization, consent requirements, right to erasure
- **Ethical Risks**: Age/gender/race bias, discrimination, harassment
- **Privacy Issues**: Unauthorized sharing, third-party disclosure

### 🎨 User Experience
- Non-intrusive floating alerts
- Clean, modern UI with gradient styling
- Copy-to-clipboard button
- Hover to persist, click to dismiss
- Auto-hide after 6 seconds
- Works on all websites (Gmail, LinkedIn, Slack, etc.)

### ⚡ Performance
- **Cold start**: <2 seconds (model in volume)
- **Inference time**: 1-3 seconds
- **Scale-to-zero**: Shuts down after 5 minutes idle
- **Concurrent requests**: 10 simultaneous users per GPU
- **Cost-efficient**: Pay-per-use with $30 free credits/month

---

## 🛠️ Tech Stack

### Frontend
- **Chrome Extension**: Vanilla JavaScript (Manifest V3)
- **Landing Page**: Next.js 15.1.4, React 19, TailwindCSS
- **UI Components**: Radix UI, Framer Motion
- **Analytics**: Vercel Analytics

### Backend & ML
- **Base Model**: Llama-3-8B (Meta)
- **Fine-Tuning**: Unsloth + LoRA (PEFT)
- **Quantization**: BitsAndBytes 4-bit
- **Inference Engine**: vLLM 0.10.2
- **Deployment**: Modal (Serverless GPU)
- **GPU**: NVIDIA L4 (30% cheaper than A10G)

### Infrastructure
- **Hosting**: Vercel (Landing page), Modal (Inference)
- **Storage**: Modal Volume (5GB model weights)
- **API**: FastAPI (with CORS)
- **Protocol**: HTTPS with JSON

---

## 📁 Project Structure

```
ethics-monitor/
├── PrismAIExtension/          # Chrome Extension
│   ├── manifest.json          # Extension configuration
│   ├── content.js             # Main monitoring script
│   ├── popup.html             # Extension popup UI
│   ├── popup.js               # Popup logic
│   └── logo.png               # Extension icon
│
├── modal_inference.py         # Modal deployment script
│   ├── download_and_merge_model()  # One-time model setup
│   ├── LlamaRiskModel          # vLLM inference class
│   └── check()                 # FastAPI endpoint
│
├── webpage/                   # Next.js Landing Page
│   ├── app/                   # App router
│   │   ├── page.tsx           # Home page
│   │   ├── api/check/         # API route (optional proxy)
│   │   └── layout.tsx         # Root layout
│   ├── components/            # React components
│   └── public/                # Static assets
│
├── hybrid_to_fine_tune.jsonl  # Training dataset (828 examples)
├── hybrid-data.py             # Dataset generation script
├── deduplication.py           # Dataset cleaning
├── risk_compliant_fine_tuning.ipynb  # Training notebook
│
├── llama-model/               # Exported model artifacts
│   ├── adapter_config.json    # LoRA configuration
│   ├── adapter_model.safetensors  # Fine-tuned weights
│   └── tokenizer.json         # Tokenizer config
│
└── README.md                  # This file
```

---

## 🎓 Training Pipeline

### Phase 1: Dataset Creation

**Objective**: Create a high-quality, domain-specific dataset for GDPR/ethics compliance.

#### Data Sources
1. **LexGLUE** (`coastalcph/lex_glue`): Legal text corpus
2. **PII Masking** (`ai4privacy/pii-masking-65k`): PII detection examples
3. **HH-RLHF** (`Anthropic/hh-rlhf`): Ethical alignment data

#### Dataset Generation Process
```python
# hybrid-data.py - Generates synthetic compliance scenarios
def create_hybrid_dataset():
    # 1. Extract compliance violations from legal corpus
    # 2. Generate realistic scenarios (names, addresses, SSNs)
    # 3. Create redacted versions
    # 4. Generate actionable advice
    # 5. Format in Alpaca structure
```

#### Alpaca Format
```json
{
  "instruction": "Check for GDPR and Ethical risks.",
  "input": "I'm sending Sarah's home address (123 Maple St) to the vendor.",
  "output": "🛡️ Risk Detected: PII exposure. Ensure Sarah's consent is documented and use a secure encrypted channel."
}
```

#### Dataset Statistics
- **Total Examples**: 828
- **Average Input Length**: 85 tokens
- **Average Output Length**: 45 tokens
- **Categories**: 
  - PII Exposure: 35%
  - GDPR Violations: 30%
  - Ethical Risks: 25%
  - Legal Issues: 10%

---

### Phase 2: Fine-Tuning

**Objective**: Specialize Llama-3-8B for compliance detection using parameter-efficient fine-tuning.

#### Model Configuration
```python
# Base model: Llama-3-8B with 4-bit quantization
model = FastLanguageModel.get_peft_model(
    base_model="unsloth/llama-3-8b-bnb-4bit",
    r=16,                    # LoRA rank
    lora_alpha=16,           # LoRA scaling
    target_modules=[
        "q_proj", "k_proj", "v_proj", "o_proj",
        "gate_proj", "up_proj", "down_proj"
    ],
    lora_dropout=0,
    bias="none"
)
```

#### Training Hyperparameters
```python
TrainingArguments(
    per_device_train_batch_size=2,
    gradient_accumulation_steps=4,  # Effective batch size: 8
    warmup_steps=5,
    max_steps=60,
    learning_rate=2e-4,
    fp16=True,                      # Mixed precision
    optim="adamw_8bit",             # 8-bit optimizer
    weight_decay=0.01,
    lr_scheduler_type="linear"
)
```

#### Training Results
- **Hardware**: NVIDIA T4 GPU (16GB VRAM)
- **Training Time**: ~15 minutes
- **Final Loss**: 0.9845
- **Trainable Parameters**: 41,943,040 (0.52% of total)
- **Model Size**: 5.7GB (merged), 500MB (LoRA adapter only)

#### Loss Curve
```
Step  1: 2.4292 → Step 60: 0.9845
Steady decrease with no signs of overfitting
```

---

## 🚀 Deployment

### Modal Deployment Architecture

```python
# modal_inference.py

# 1. Model Merge (One-time setup)
@app.function(gpu="L4", timeout=1200)
def download_and_merge_model():
    base = AutoModelForCausalLM.from_pretrained("unsloth/llama-3-8b-bnb-4bit")
    lora = PeftModel.from_pretrained(base, "nirmanpatel/llama-risk-compliant")
    merged = lora.merge_and_unload()
    merged.save_pretrained("/cache/merged-model")
    # Result: Fully merged model in persistent volume

# 2. Inference Service
@app.cls(gpu="L4", container_idle_timeout=300)
class LlamaRiskModel:
    @modal.enter()
    def start_engine(self):
        self.llm = LLM(
            model="/cache/merged-model",
            quantization="bitsandbytes",
            enforce_eager=True,
            max_model_len=4096
        )
    
    @modal.method()
    def generate_advice(self, text: str):
        prompt = format_alpaca_prompt(text)
        return self.llm.generate(prompt, temperature=0.1)

# 3. FastAPI Endpoint
@app.function()
@modal.fastapi_endpoint(method="POST")
async def check(data: dict):
    model = LlamaRiskModel()
    advice = await model.generate_advice.remote.aio(data["text"])
    return {"advice": advice}
```

### Deployment Steps

#### Step 1: Install Modal CLI
```bash
pip install modal
modal token new  # Authenticate
```

#### Step 2: Set Up HuggingFace Secret
```bash
modal secret create huggingface-secret HF_TOKEN=hf_your_token_here
```

#### Step 3: Download & Merge Model (One-time)
```bash
modal run modal_inference.py::download_and_merge_model
# Takes ~10 minutes, downloads 5GB to persistent volume
```

#### Step 4: Deploy Inference Endpoint
```bash
modal deploy modal_inference.py
# Returns: https://yourname--prism-ai-vllm-check.modal.run
```

#### Step 5: Update Chrome Extension
```javascript
// content.js
const MODAL_ENDPOINT = "https://your-deployment-url.modal.run";
```

---

## 💻 Installation

### Prerequisites
- Python 3.12+
- Node.js 18+
- Chrome Browser
- Modal Account (free tier)
- HuggingFace Account

### Chrome Extension Setup

1. **Clone Repository**
```bash
git clone https://github.com/nirmanpatel/ethics-monitor.git
cd ethics-monitor
```

2. **Configure Endpoint**
```javascript
// PrismAIExtension/content.js
const MODAL_ENDPOINT = "https://your-modal-url.modal.run";
```

3. **Load Extension**
- Open Chrome → `chrome://extensions/`
- Enable "Developer mode"
- Click "Load unpacked"
- Select `PrismAIExtension/` folder

4. **Test Extension**
- Go to any website with text input
- Type: "Sharing John's SSN: 123-45-6789"
- Wait 1 second → Alert appears!

### Landing Page Setup

```bash
cd webpage
pnpm install
pnpm dev  # Runs on http://localhost:3000
```

### Deploy to Vercel
```bash
vercel deploy
# or push to GitHub (auto-deploys)
```

---

## 📖 Usage

### Basic Usage

1. **Enable Extension**: Click extension icon → Toggle "Active"
2. **Type in any field**: Gmail, LinkedIn, Slack, etc.
3. **Wait 1 second**: Extension debounces input
4. **View alert**: Floating notification appears with risk details
5. **Copy advice**: Click "Copy" button to save advice
6. **Dismiss**: Click alert or wait 3 seconds

### Example Scenarios

#### Scenario 1: PII Exposure
```
Input: "Send this to John: his SSN is 456-78-9012"
Alert: 🛡️ Risk Detected: Social Security Number exposure. 
       Redact SSN before sending and use secure channels.
```

#### Scenario 2: GDPR Violation
```
Input: "Customer database will be shared with marketing team"
Alert: 🛡️ GDPR Risk: Data sharing requires explicit consent. 
       Ensure customers opted in for marketing communications.
```

#### Scenario 3: Workplace Bias
```
Input: "The candidate seems too old for this fast-paced role"
Alert: 🛡️ Ethical Risk: Age discrimination detected. 
       Focus on skills and qualifications, not age.
```

### Analytics

Extension tracks:
- **Scan Count**: Total texts analyzed
- **Alert Count**: Risks detected
- View in popup: Extension icon → Statistics

---

## 📊 Performance

### Inference Metrics
| Metric | Value |
|--------|-------|
| Initial Startup | 49.75s |
| Cold Start | < 2s |
| Inference Time | 1-3s |
| Throughput | 10 req/sec |
| GPU Utilization | 90% |
| Max Context | 4096 tokens |
| Max Output | 300 tokens |

### Cost Analysis (Modal)
- **Free Tier**: $30/month (~30,000 inferences)
- **L4 GPU**: $0.000294/sec
- **Average Request**: $0.001 (1 second)
- **Idle Cost**: $0 (scales to zero)

### Model Performance
- **Base Model**: Llama-3-8B (8B parameters)
- **Fine-Tuned**: 42M trainable parameters (0.52%)
- **Quantization**: 4-bit (75% size reduction)
- **Memory**: 6GB VRAM required

---

## 🔌 API Reference

### Modal Endpoint

**URL**: `https://your-deployment-id--prism-ai-vllm-check.modal.run`

**Method**: `POST`

**Headers**:
```
Content-Type: application/json
```

**Request Body**:
```json
{
  "text": "User input to analyze"
}
```

**Response**:
```json
{
  "advice": "🛡️ Risk analysis and actionable advice"
}
```

**Status Codes**:
- `200`: Success
- `400`: Invalid request
- `500`: Server error

### Example Request (cURL)
```bash
curl -X POST https://your-modal-url.modal.run \
  -H "Content-Type: application/json" \
  -d '{"text": "Sending customer SSN 123-45-6789 to vendor"}'
```

### Example Response
```json
{
  "advice": "🛡️ Risk Detected: SSN exposure. Never share SSNs via insecure channels. Use encrypted systems and obtain explicit consent."
}
```

---

## 🧪 Testing

### Manual Testing

1. **Gmail Compose**
```
Type: "Sarah's email is sarah@company.com, forward to external partner"
Expected: Alert about email disclosure
```

2. **LinkedIn Message**
```
Type: "The 60-year-old candidate might struggle with tech"
Expected: Alert about age discrimination
```

3. **Slack Channel**
```
Type: "Customer credit card: 4532-1234-5678-9010"
Expected: Alert about payment data exposure
```

### Load Testing
```bash
# Install k6
brew install k6

# Run load test
k6 run load-test.js
```

---

## 🤝 Contributing

Contributions welcome! Please follow these guidelines:

### Development Setup
```bash
git clone https://github.com/NirmanPatel036/prism-aiw.git
cd ethics-monitor
git checkout -b feature/your-feature
```

### Code Style
- **Python**: Black formatter, PEP 8
- **JavaScript**: ESLint, Prettier
- **TypeScript**: Strict mode

### Pull Request Process
1. Fork the repository
2. Create feature branch
3. Commit changes with clear messages
4. Add tests for new features
5. Submit PR with description

---

## 🙏 Acknowledgments

- **Meta AI**: Llama-3-8B base model
- **Unsloth**: Fast fine-tuning library
- **Modal**: Serverless GPU infrastructure
- **vLLM**: High-performance inference engine
- **HuggingFace**: Model hosting and datasets

---

## 📧 Contact

**Nirman Patel**
- GitHub: [@nirmanpatel](https://github.com/NirmanPatel036)
- Email: nirman0511@gmail.com
- Model: [huggingface.co/nirmanpatel/llama-risk-compliant](https://huggingface.co/nirmanpatel/llama-risk-compliant)

---

## 🗺️ Future Enhancements

- [ ] Multi-language support (Spanish, French, German)
- [ ] Custom rule configuration
- [ ] Team dashboard for compliance metrics
- [ ] Slack/Teams integration
- [ ] Mobile app version
- [ ] Fine-grained privacy controls
- [ ] Offline mode with local model
- [ ] Enterprise deployment guide

---

<div align="center">

**⭐ Star this repo if you find it useful!**

Made with ❤️ by [Nirman Patel](https://github.com/nirmanpatel)

</div>
