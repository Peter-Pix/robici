// Sdílená knihovna pro Ollama API volání
import https from 'node:https';

const OLLAMA_URL = 'https://ollama.com/api/chat';

export async function ollamaCall(
  model: string,
  systemPrompt: string,
  userMessage: string,
  timeoutMs = 30000
): Promise<{ content: string; duration: number }> {
  return new Promise((resolve, reject) => {
    const start = Date.now();
    const body = JSON.stringify({
      model,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userMessage },
      ],
      stream: false,
    });

    const url = new URL(OLLAMA_URL);
    const req = https.request(
      {
        hostname: url.hostname,
        path: url.pathname,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.OLLAMA_API_KEY}`,
          'Content-Length': Buffer.byteLength(body).toString(),
        },
        timeout: timeoutMs,
      },
      (res) => {
        let data = '';
        res.on('data', (chunk) => (data += chunk));
        res.on('end', () => {
          try {
            const parsed = JSON.parse(data);
            const duration = (Date.now() - start) / 1000;
            resolve({
              content: parsed.message?.content ?? '',
              duration,
            });
          } catch (e: any) {
            reject(new Error(`JSON parse error: ${e.message}`));
          }
        });
      }
    );

    req.on('error', (e) => reject(new Error(`HTTP error: ${e.message}`)));
    req.on('timeout', () => {
      req.destroy();
      reject(new Error('Ollama API timeout'));
    });

    req.write(body);
    req.end();
  });
}

// IP limit — jednoduchá in-memory implementace
// Pro produkci použít Redis
const ipLimits = new Map<string, { date: string; counts: Record<string, number> }>();

// Výjimka pro localhost a benchmark — žádný limit
const UNLIMITED_IPS = new Set([
  '127.0.0.1',
  '::1',
  '::ffff:127.0.0.1',
  'localhost',
]);

export function checkIpLimit(
  ip: string,
  tool: string,
  maxPerDay = 3
): { allowed: boolean; remaining: number } {
  // Localhost a benchmark mají neomezený limit
  if (UNLIMITED_IPS.has(ip)) {
    return { allowed: true, remaining: 999 };
  }

  const today = new Date().toISOString().split('T')[0];
  const record = ipLimits.get(ip);

  if (!record || record.date !== today) {
    ipLimits.set(ip, { date: today, counts: { [tool]: 1 } });
    return { allowed: true, remaining: maxPerDay - 1 };
  }

  const current = record.counts[tool] || 0;
  if (current >= maxPerDay) {
    return { allowed: false, remaining: 0 };
  }

  record.counts[tool] = current + 1;
  return { allowed: true, remaining: maxPerDay - current - 1 };
}

// Reset IP limit (pro testování)
export function resetIpLimits(): void {
  ipLimits.clear();
}
