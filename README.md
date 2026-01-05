# 🛡️ PrismAI: Ethics & Law Compliance Monitor

![Python](https://img.shields.io/badge/python-3.12+-blue.svg)
![Framework](https://img.shields.io/badge/Framework-Unsloth-green.svg)
![Deployment](https://img.shields.io/badge/Deployment-Vercel%20Serverless-black.svg)
![AI-Model](https://img.shields.io/badge/Model-Llama--3--8B-orange.svg)

**PrismAI** is a real-time compliance assistant that detects GDPR leaks and unconscious bias in workplace communications. Unlike standard AI tools, PrismAI uses a dedicated proxy architecture to ensure data security and API token protection.

---

## 🏗️ System Architecture: The "Safe Bridge"
To protect API credentials and user privacy, this project implements a **Serverless Proxy Pattern**:

1. **Client (Chrome Extension):** Monitors text inputs and sends raw text to a secure endpoint. No API keys are stored in the extension source code.
2. **Proxy (Vercel Backend):** A Node.js serverless function that securely appends the `HF_TOKEN` from environment variables and communicates with the Hugging Face Router.
3. **Inference (Hugging Face):** Our fine-tuned Llama-3 model processes the request via the **Hugging Face Router API** for high availability.

---

## 🚀 Development Phases

### Phase 1: Custom Fine-Tuning
* **Model:** Llama-3-8B (4-bit quantization).
* **Optimization:** Used **Unsloth** for 2x faster training and significantly lower VRAM usage.
* **Dataset:** 1,200+ synthetic instruction-response pairs covering PII leaks, hiring bias, and legal ethics.

### Phase 2: Production Proxy (Vercel)
* **API:** Migrated from `ngrok` to a permanent Vercel Serverless Function.
* **Security:** Implemented server-side token injection to prevent key exposure in the browser.
* **Formatting:** Built a custom "Scrubbing Engine" to remove LLM artifacts like `<|end_of_text|>`.

### Phase 3: Extension UI/UX
* **Monitoring Toggle:** Users can activate/deactivate monitoring via a sleek popup.
* **Floating Alerts:** Non-intrusive tooltips appear near text areas with real-time compliance advice.
* **Analytics:** Tracks scan counts and alert frequency via `chrome.storage`.

---

## 🛠️ Installation & Setup

### 1. Backend (Vercel)
* Set up a Vercel project with the code in `/api`.
* Add `HF_TOKEN` as an Environment Variable in the Vercel Dashboard.

### 2. Frontend (Extension)
* Update `PROXY_URL` in `content.js` to your Vercel deployment link.
* Load the extension in Chrome via `chrome://extensions/` -> **Load Unpacked**.

---

## 📈 Impact
* **Latency:** ~800ms response time via Hugging Face Router.
* **Security:** 0% risk of API key theft due to proxy architecture.
* **Scalability:** Handles thousands of concurrent requests through serverless scaling.
