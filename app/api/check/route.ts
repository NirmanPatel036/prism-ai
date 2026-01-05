import { NextRequest, NextResponse } from 'next/server'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
}

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders })
}

export async function POST(request: NextRequest) {
  try {
    const { text } = await request.json()
    const HF_TOKEN = process.env.HF_TOKEN

    if (!HF_TOKEN) {
      return NextResponse.json(
        { error: "HF_TOKEN not configured", advice: "Server configuration error: Missing API token" },
        { status: 500, headers: corsHeaders }
      )
    }

    const response = await fetch("https://router.huggingface.co/hf-inference/models/nirmanpatel/llama-risk-compliant", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${HF_TOKEN}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        inputs: `### Instruction: You are a legal compliance AI. Analyze the following text for GDPR violations, ethical risks, and legal concerns. Be concise.\n\n### Input: ${text}\n\n### Response:`,
        parameters: {
          max_new_tokens: 150,
          temperature: 0.1,
          return_full_text: false
        }
      })
    })

    const data = await response.json()
    
    // Debug: log the response structure
    console.log("HF API Response:", JSON.stringify(data))

    if (data.error) {
      return NextResponse.json(
        { error: data.error, advice: `API Error: ${data.error.message || data.error}` },
        { status: 500, headers: corsHeaders }
      )
    }

    // Handle different response formats
    let advice = ""
    if (data.choices?.[0]?.message?.content) {
      advice = data.choices[0].message.content
    } else if (Array.isArray(data) && data[0]?.generated_text) {
      advice = data[0].generated_text
    } else if (data.generated_text) {
      advice = data.generated_text
    } else {
      advice = `Debug: ${JSON.stringify(data)}`
    }

    return NextResponse.json({ advice }, { headers: corsHeaders })
  } catch (error: any) {
    return NextResponse.json(
      { error: "Failed to reach AI model", advice: `Error: ${error?.message || String(error)}` },
      { status: 500, headers: corsHeaders }
    )
  }
}
