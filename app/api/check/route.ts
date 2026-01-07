import { NextResponse } from 'next/server';

// CORS headers for Chrome Extension compatibility
const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
};

export async function OPTIONS(request: Request) {
    return NextResponse.json({}, { headers: corsHeaders });
}

export async function POST(request: Request) {
    try {
        // 1. Parse the incoming JSON body from the Chrome Extension
        const { text } = await request.json();

        if (!text) {
            return NextResponse.json(
                { error: 'No text provided' }, 
                { status: 400, headers: corsHeaders }
            );
        }

        // 2. Access the environment variable
        const MODAL_URL = process.env.MODAL_URL;

        if (!MODAL_URL) {
            console.error("MODAL_URL is not defined in environment variables.");
            return NextResponse.json(
                { error: 'Server configuration error' }, 
                { status: 500, headers: corsHeaders }
            );
        }

        // 3. Forward the request to Modal
        const response = await fetch(MODAL_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text })
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error("Modal Inference Error:", errorText);
            return NextResponse.json(
                { error: 'AI processing failed' }, 
                { status: response.status, headers: corsHeaders }
            );
        }

        const data = await response.json();

        // 4. Return the advice with CORS headers
        return NextResponse.json(
            { advice: data.advice },
            { headers: corsHeaders }
        );

    } catch (error) {
        console.error("Route Handler Error:", error);
        return NextResponse.json(
            { error: 'Internal Server Error' }, 
            { status: 500, headers: corsHeaders }
        );
    }
}
