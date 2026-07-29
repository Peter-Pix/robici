// Logger — ukládá reálná data o použití nástrojů
// Ukládá do JSON souboru v .usage-logs/ (mimo git)

import fs from 'fs';
import path from 'path';

const LOG_DIR = path.join(process.cwd(), '.usage-logs');
const LOG_FILE = path.join(LOG_DIR, 'usage-log.ndjson');

export interface UsageEntry {
  timestamp: string;
  tool: string;
  robik: string;
  emoji: string;
  mode: string;
  ip: string;
  inputLength: number;
  outputLength: number;
  duration: number;
  model: string;
  status: 'ok' | 'error' | 'limit' | 'validation';
  errorMessage?: string;
  userAgent?: string;
}

// In-memory buffer pro rychlý zápis
let buffer: UsageEntry[] = [];
let writeTimer: NodeJS.Timeout | null = null;

function ensureLogDir() {
  if (!fs.existsSync(LOG_DIR)) {
    fs.mkdirSync(LOG_DIR, { recursive: true });
  }
}

function flushBuffer() {
  if (buffer.length === 0) return;
  ensureLogDir();
  const lines = buffer.map((entry) => JSON.stringify(entry)).join('\n') + '\n';
  try {
    fs.appendFileSync(LOG_FILE, lines, 'utf-8');
  } catch (e) {
    console.error('[Logger] Failed to write:', e);
  }
  buffer = [];
}

export function logUsage(entry: UsageEntry) {
  buffer.push(entry);

  // Flush každých 5s nebo při 20 záznamech
  if (buffer.length >= 20) {
    if (writeTimer) clearTimeout(writeTimer);
    flushBuffer();
  } else if (!writeTimer) {
    writeTimer = setTimeout(() => {
      writeTimer = null;
      flushBuffer();
    }, 5000);
  }
}

// Flush při ukončení procesu
process.on('beforeExit', () => {
  if (writeTimer) clearTimeout(writeTimer);
  flushBuffer();
});

// === API pro čtení logů ===
export interface AggregatedMetrics {
  total: number;
  successful: number;
  failed: number;
  limited: number;
  successRate: number;
  avgDuration: number;
  avgInputLength: number;
  avgOutputLength: number;
  totalDuration: number;
  totalChars: number;
  byTool: Record<string, {
    count: number;
    success: number;
    fail: number;
    avgDuration: number;
    avgChars: number;
  }>;
  byDay: Record<string, number>;
  recentEntries: UsageEntry[];
}

export function getAggregatedMetrics(days = 7): AggregatedMetrics {
  ensureLogDir();
  if (!fs.existsSync(LOG_FILE)) {
    return createEmptyMetrics();
  }

  const raw = fs.readFileSync(LOG_FILE, 'utf-8');
  const lines = raw.trim().split('\n').filter(Boolean);
  const entries: UsageEntry[] = lines.map((l) => JSON.parse(l));

  const cutoff = Date.now() - days * 24 * 60 * 60 * 1000;
  const recent = entries.filter((e) => new Date(e.timestamp).getTime() > cutoff);

  const successful = recent.filter((e) => e.status === 'ok');
  const failed = recent.filter((e) => e.status === 'error');
  const limited = recent.filter((e) => e.status === 'limit');

  const byTool: Record<string, any> = {};
  const byDay: Record<string, number> = {};

  for (const entry of recent) {
    // By tool
    if (!byTool[entry.tool]) {
      byTool[entry.tool] = { count: 0, success: 0, fail: 0, avgDuration: 0, avgChars: 0 };
    }
    const t = byTool[entry.tool];
    t.count++;
    if (entry.status === 'ok') {
      t.success++;
      t.avgDuration += entry.duration;
      t.avgChars += entry.outputLength;
    } else {
      t.fail++;
    }

    // By day
    const day = entry.timestamp.split('T')[0];
    byDay[day] = (byDay[day] || 0) + 1;
  }

  // Averages
  for (const key of Object.keys(byTool)) {
    const t = byTool[key];
    if (t.success > 0) {
      t.avgDuration = Math.round((t.avgDuration / t.success) * 10) / 10;
      t.avgChars = Math.round(t.avgChars / t.success);
    }
  }

  const totalDuration = successful.reduce((acc, e) => acc + e.duration, 0);
  const totalChars = successful.reduce((acc, e) => acc + e.outputLength, 0);

  return {
    total: recent.length,
    successful: successful.length,
    failed: failed.length,
    limited: limited.length,
    successRate: recent.length > 0 ? Math.round((successful.length / recent.length) * 100) : 0,
    avgDuration: successful.length > 0 ? Math.round((totalDuration / successful.length) * 10) / 10 : 0,
    avgInputLength: successful.length > 0 ? Math.round(successful.reduce((a, e) => a + e.inputLength, 0) / successful.length) : 0,
    avgOutputLength: successful.length > 0 ? Math.round(totalChars / successful.length) : 0,
    totalDuration: Math.round(totalDuration),
    totalChars,
    byTool,
    byDay,
    recentEntries: recent.slice(-20).reverse(),
  };
}

function createEmptyMetrics(): AggregatedMetrics {
  return {
    total: 0, successful: 0, failed: 0, limited: 0, successRate: 0,
    avgDuration: 0, avgInputLength: 0, avgOutputLength: 0,
    totalDuration: 0, totalChars: 0,
    byTool: {}, byDay: {}, recentEntries: [],
  };
}
