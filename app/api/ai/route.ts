import { GoogleGenAI } from '@google/genai';
import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
  try {
    const { dishName, roughNotes, category } = await req.json();

    if (!dishName) {
      return NextResponse.json({ error: 'dishName is required' }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: 'GEMINI_API_KEY is not configured on the server.' },
        { status: 500 }
      );
    }

    const ai = new GoogleGenAI({ apiKey });

    const prompt = `You are an executive chef, gourmet copywriter, and multilingual culinary expert for a luxury restaurant.
Given this dish title or concept: "${dishName}" (Category: "${category || 'General'}", Notes: "${roughNotes || 'Authentic gourmet recipe'}"), generate a complete, enticing culinary profile.

You MUST respond strictly in valid JSON format matching this exact schema:
{
  "name": {
    "ar": "Appetizing Arabic dish name",
    "en": "Enticing English dish name",
    "fa": "Persian (Farsi) dish name",
    "ur": "Urdu dish name",
    "ku": "Kurdish (Sorani/Badini) dish name",
    "tr": "Turkish dish name"
  },
  "description": {
    "ar": "Sensory, appetizing Arabic description (1-2 sentences)",
    "en": "Sensory, mouthwatering English description (1-2 sentences)",
    "fa": "Sensory, appetizing Persian description (1-2 sentences)",
    "ur": "Sensory, appetizing Urdu description (1-2 sentences)",
    "ku": "Sensory Kurdish description (1-2 sentences)",
    "tr": "Sensory Turkish description (1-2 sentences)"
  },
  "ingredients": {
    "ar": "Comma-separated Arabic ingredients",
    "en": "Comma-separated English ingredients",
    "fa": "Comma-separated Persian ingredients",
    "ur": "Comma-separated Urdu ingredients",
    "ku": "Comma-separated Kurdish ingredients",
    "tr": "Comma-separated Turkish ingredients"
  },
  "suggestedPrice": 12000,
  "calories": 450,
  "prepTimeMinutes": 10,
  "dietaryTags": ["halal", "chef-special"],
  "allergens": ["gluten", "dairy"]
}

Allowed dietaryTags: ["halal", "vegetarian", "vegan", "spicy", "chef-special", "bestseller", "gluten-free"]
Allowed allergens: ["nuts", "dairy", "gluten", "eggs", "soy", "seafood", "sesame"]

Return only raw JSON without markdown code fences or commentary.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.7-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
      },
    });

    const responseText = response.text || '{}';
    let data;
    try {
      data = JSON.parse(responseText);
    } catch {
      // Clean potential backticks if any
      const cleaned = responseText.replace(/```json\n?|\n?```/g, '').trim();
      data = JSON.parse(cleaned);
    }

    return NextResponse.json({ success: true, data });
  } catch (error: any) {
    console.error('Gemini AI API Error:', error);
    return NextResponse.json(
      { error: error?.message || 'Failed to generate dish details' },
      { status: 500 }
    );
  }
}
