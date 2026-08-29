// Helper pro logování do všech tool endpointů
import { NextRequest } from 'next/server';
import { logUsage, UsageEntry } from './logger';

const TOOL_META: Record<string, { robik: string; emoji: string; model: string }> = {
  'pepa-rewrite': { robik: 'Pepa', emoji: '✍️', model: 'gemma4:31b' },
  'marie-check': { robik: 'Marie', emoji: '📋', model: 'gemma4:31b' },
  'anicka-reply': { robik: 'Anička', emoji: '❤️', model: 'minimax-m3' },
  'franta-improve': { robik: 'Franta', emoji: '💰', model: 'kimi-k2.7-code' },
  'emil-summarize': { robik: 'Emil', emoji: '📊', model: 'deepseek-v4-flash' },
  'team-breakdown': { robik: 'Tým', emoji: '🧠', model: 'kimi-k2.7-code' },
  'mail-rewrite': { robik: 'Pepa+Marie', emoji: '✍️', model: 'gemma4:31b+kimi-k2.7-code' },
  'rodina-chat': { robik: 'Rodina', emoji: '👨👩👧👦', model: 'gemma4:31b' },
};

export function getIp(request: NextRequest): string {
  return request.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
    || request.headers.get('x-real-ip')
    || 'unknown';
}

export function logToolUsage(
  request: NextRequest,
  tool: string,
  status: UsageEntry['status'],
  details: {
    inputLength: number;
    outputLength?: number;
    duration?: number;
    mode?: string;
    errorMessage?: string;
  }
) {
  const meta = TOOL_META[tool];
  if (!meta) return;

  logUsage({
    timestamp: new Date().toISOString(),
    tool,
    robik: meta.robik,
    emoji: meta.emoji,
    mode: details.mode || 'default',
    ip: getIp(request),
    inputLength: details.inputLength,
    outputLength: details.outputLength || 0,
    duration: details.duration || 0,
    model: meta.model,
    status,
    errorMessage: details.errorMessage,
    userAgent: request.headers.get('user-agent') || undefined,
  });
}
