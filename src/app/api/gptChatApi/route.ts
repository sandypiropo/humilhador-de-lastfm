import { OpenAI } from 'openai';
import { NextRequest, NextResponse } from 'next/server';
import { getRandomFallbackMessage } from '@/utils/fallbackMessages'; // importe aqui

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

    const aiText = response.choices?.[0]?.message?.content?.trim();

    if (!aiText || aiText.length < 10) {
      return NextResponse.json({
        choices: [{ message: { content: getRandomFallbackMessage() } }]
      });
    }

    return NextResponse.json(response);

  } catch (error) {
    console.error('Erro ao chamar a OpenAI:', error);

    return NextResponse.json({
      choices: [{ message: { content: getRandomFallbackMessage() } }]
    }, { status: 200 });
  }
}

