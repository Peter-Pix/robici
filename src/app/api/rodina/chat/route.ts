// /api/rodina/chat — Chat s Robíkem v osobnosti (interakce Robík ↔ LLM)
// Využívá existující src/lib/ollama.ts (ollamaCall) + checkIpLimit + logToolUsage.
// System prompt se staví z robots.ts (role, osobnost, hlášky) — single-source-of-truth.
import { NextRequest, NextResponse } from 'next/server';
import { ollamaCall, checkIpLimit } from '@/lib/ollama';
import { getIp, logToolUsage } from '@/lib/tool-logger';
import { flushLogs } from '@/lib/logger';
import { robots } from '@/data/robots/robots';

export const maxDuration = 60;
export const dynamic = 'force-dynamic';

// Model pro chat — lehký, rychlý, dobrý na konverzaci.
const CHAT_MODEL = 'gemma4:31b';

export async function POST(request: NextRequest) {
  const ip = getIp(request);

  try {
    const body = await request.json();
    const robotId: string = body.robotId?.trim() || '';
    const message: string = body.message?.trim() || '';

    if (!robotId) {
      return NextResponse.json({ error: 'Vyber Robíka, se kterým chceš mluvit.' }, { status: 400 });
    }
    if (!message) {
      return NextResponse.json({ error: 'Napiš, co chceš Robíkovi říct.' }, { status: 400 });
    }
    if (message.length > 1000) {
      return NextResponse.json({ error: 'To je moc textu. Max 1000 znaků.' }, { status: 400 });
    }

    // Najdi Robíka v robots.ts (single-source-of-truth).
    const robot = robots.find((r) => r.id === robotId);
    if (!robot) {
      return NextResponse.json({ error: `Robík "${robotId}" neexistuje.` }, { status: 404 });
    }

    // Rate limit — 10 zpráv denně na IP (chat je interaktivní, ne tool).
    const limit = checkIpLimit(ip, `rodina-chat-${robotId}`, 10);
    if (!limit.allowed) {
      return NextResponse.json(
        { error: `Dnes už jsi s ${robot.name} mluvil dost. Zítra zase.`, remaining: 0 },
        { status: 429 }
      );
    }

    // System prompt z osobnosti Robíka — role, popis, osobnost, hlášky.
    const systemPrompt = [
      `Jsi ${robot.name}, ${robot.role} v malé firmě Robíci s.r.o.`,
      `Tvoje osobnost: ${robot.personality.join('; ')}.`,
      `Tvoje typické hlášky: ${robot.catchphrases.join('; ')}.`,
      `O tobě: ${robot.description}`,
      'Mluv česky, přirozeně, v tónu své osobnosti. Buď stručný (max 3-4 věty), přátelský a autentický.',
      'Neříkej, že jsi AI model. Jsi Robík z rodiny.',
    ].join('\n');

    const result = await ollamaCall(
      CHAT_MODEL,
      systemPrompt,
      `Uživatel ti píše: "${message}"`
    );

    logToolUsage(request, 'rodina-chat', 'ok', {
      inputLength: message.length,
      outputLength: result.content.length,
      duration: result.duration,
    });

    await flushLogs();

    return NextResponse.json({
      robik: robot.name,
      emoji: robot.emoji,
      reply: result.content,
      duration: result.duration,
      remaining: limit.remaining,
    });
  } catch (error: any) {
    logToolUsage(request, 'rodina-chat', 'error', {
      inputLength: 0,
      errorMessage: error.message,
    });

    await flushLogs();

    return NextResponse.json({ error: `Něco se rozbilo: ${error.message}` }, { status: 500 });
  }
}
