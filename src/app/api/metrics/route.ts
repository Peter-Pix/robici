// /api/metrics — Vrací reálné agregované metriky z Vercel Blob / lokálního souboru
import { NextResponse } from 'next/server';
import { getAggregatedMetrics } from '@/lib/logger';

export const dynamic = 'force-dynamic';

export async function GET() {
  const metrics = await getAggregatedMetrics(7);
  return NextResponse.json(metrics);
}
