export default async function handler(req, res) {
    // 1. Only allow POST requests
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { text } = req.body;
    const HF_TOKEN = process.env.HF_TOKEN;

    try {
        const response = await fetch("https://router.huggingface.co/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${HF_TOKEN}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                model: "nirmanpatel/llama-risk-compliant:auto",
                messages: [
                    { "role": "system", "content": "You are a legal compliance AI. Flag GDPR and ethical risks." },
                    { "role": "user", "content": text }
                ],
                max_tokens: 150,
                temperature: 0.1
            })
        });

        const data = await response.json();
        const advice = data.choices[0].message.content;

        // 2. Return the clean advice back to the extension
        res.status(200).json({ advice });
    } catch (error) {
        res.status(500).json({ error: "Failed to reach AI model" });
    }
}