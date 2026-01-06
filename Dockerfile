# Use a lightweight CUDA image
FROM vllm/vllm-openai:latest

# Set environment variables for your Hugging Face model
ENV MODEL_ID="nirmanpatel/llama-risk-compliant"
ENV PORT=8080

# Expose the port
EXPOSE 8080

# Start vLLM with 4-bit quantization enabled and optimized for L4 GPUs
ENTRYPOINT python3 -m vllm.entrypoints.openai.api_server \
    --model $MODEL_ID \
    --quantization bitsandbytes \
    --load-format bitsandbytes \
    --max-model-len 2048 \
    --port 8080 \
    --gpu-memory-utilization 0.90