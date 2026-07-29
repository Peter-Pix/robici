// /api/debug/reset-limits — Reset IP limitů (jen pro localhost)
import { NextRequest, NextResponse } from 'next/server';
import { resetIpLimits } from '@/lib/ollama';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
  
  if (ip !== '127.0.0.1' && ip !== '::1' && ip !== '::ffff:127.0.0.1' && ip !== 'localhost') {
    return NextResponse.json({ error: 'Jen pro localhost.' }, { status: 403 });
  }

  resetIpLimits();
  return NextResponse.json({ status: 'ok', message: 'Limity resetovány.' });
}
