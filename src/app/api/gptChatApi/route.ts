import { OpenAI } from 'openai';
import { NextRequest, NextResponse } from 'next/server';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, 
});

export async function POST(req: NextRequest) {
  const { prompt } = await req.json();

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4-turbo-preview', 
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 200,
    });

    return NextResponse.json(response);
  } catch (error) {
    console.error('Erro ao chamar a OpenAI:', error);
    return NextResponse.json({ error: 'Erro ao se comunicar com a IA.' }, { status: 500 });
  }
}
