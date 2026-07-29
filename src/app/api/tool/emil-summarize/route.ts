// /api/tool/emil-summarize — 📊 Emil: Shrň text
import { NextRequest, NextResponse } from 'next/server';
import { ollamaCall, checkIpLimit } from '@/lib/ollama';
import { getIp, logToolUsage } from '@/lib/tool-logger';
import { flushLogs } from '@/lib/logger';

export const maxDuration = 60;
export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  const ip = getIp(request);

  try {
    const body = await request.json();
    const text: string = body.text?.trim() || '';

    if (!text) {
      logToolUsage(request, 'emil-summarize', 'validation', { inputLength: 0 });
      return NextResponse.json({ error: 'Vlož text, který chceš shrnout.' }, { status: 400 });
    }
    if (text.length > 5000) {
      logToolUsage(request, 'emil-summarize', 'validation', { inputLength: text.length });
      return NextResponse.json({ error: 'Emil nestíhá. Max 5000 znaků.' }, { status: 400 });
    }

    const limit = checkIpLimit(ip, 'emil-summarize');
    if (!limit.allowed) {
      logToolUsage(request, 'emil-summarize', 'limit', { inputLength: text.length });
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

    logToolUsage(request, 'emil-summarize', 'ok', {
      inputLength: text.length,
      outputLength: result.content.length,
      duration: result.duration,
    });

    await flushLogs();

    return NextResponse.json({
      robik: 'Emil',
      emoji: '📊',
      input: text,
      output: result.content,
      duration: result.duration,
      remaining: limit.remaining,
    });
  } catch (error: any) {
    logToolUsage(request, 'emil-summarize', 'error', {
      inputLength: 0,
      errorMessage: error.message,
    });

    await flushLogs();

    return NextResponse.json({ error: `Něco se rozbilo: ${error.message}` }, { status: 500 });
  }
}
