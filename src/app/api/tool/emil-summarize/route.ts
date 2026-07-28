// /api/tool/emil-summarize — 📊 Emil: Shrň text
import { NextRequest, NextResponse } from 'next/server';
import { ollamaCall, checkIpLimit } from '@/lib/ollama';

export const maxDuration = 60;
export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const text: string = body.text?.trim() || '';

    if (!text) {
      return NextResponse.json({ error: 'Vlož text, který chceš shrnout.' }, { status: 400 });
    }
    if (text.length > 5000) {
      return NextResponse.json({ error: 'Emil nestíhá. Max 5000 znaků.' }, { status: 400 });
    }

    const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
    const limit = checkIpLimit(ip, 'emil-summarize');
    if (!limit.allowed) {
      return NextResponse.json({ error: `Dnes už jsi Emila využil 3×. Zítra zase.`, remaining: 0 }, { status: 429 });
    }

    const result = await ollamaCall(
      'deepseek-v4-flash',
      `Jsi Emil, analytik v malé firmě Robíci s.r.o.
- Z textu extrahuješ: hlavní body (max 5), rozhodnutí, úkoly, otevřené otázky.
- Používej odrážky. Buď věcný a přesný.
- Žádné zbytečné kecy. Jen fakta.
- Když je text krátký, řekni to.`,
      `Shrň tenhle text do strukturovaného výstupu: "${text}"`
    );

    return NextResponse.json({
      robik: 'Emil',
      emoji: '📊',
      input: text,
      output: result.content,
      duration: result.duration,
      remaining: limit.remaining,
    });
  } catch (error: any) {
    return NextResponse.json({ error: `Něco se rozbilo: ${error.message}` }, { status: 500 });
  }
}
