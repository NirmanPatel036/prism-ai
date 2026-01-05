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
    })

    const data = await response.json()
    const advice = data.choices?.[0]?.message?.content || "No response from model"

    return NextResponse.json({ advice }, { headers: corsHeaders })
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to reach AI model" },
      { status: 500, headers: corsHeaders }
    )
  }
}
