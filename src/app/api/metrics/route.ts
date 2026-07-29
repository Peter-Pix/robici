// /api/metrics — Vrací agregované metriky z nasimulovaných dat
import { NextResponse } from 'next/server';
import simulatedData from '@/data/metrics/simulated-data.json';

export const dynamic = 'force-dynamic';

export async function GET() {
  const data = simulatedData as any;
  const interactions = data.interactions || [];

  // Metriky podle nástroje
  const byTool: Record<string, { count: number; avgDuration: number; avgChars: number; success: number; fail: number }> = {};
  
  for (const item of interactions) {
    if (!byTool[item.tool]) {
      byTool[item.tool] = { count: 0, avgDuration: 0, avgChars: 0, success: 0, fail: 0 };
    }
    const t = byTool[item.tool];
    t.count++;
    if (item.status === 'ok') {
      t.success++;
      t.avgDuration += item.duration;
      t.avgChars += item.chars;
    } else {
      t.fail++;
    }
  }

  // Průměry
  for (const key of Object.keys(byTool)) {
    const t = byTool[key];
    if (t.success > 0) {
      t.avgDuration = Math.round((t.avgDuration / t.success) * 10) / 10;
      t.avgChars = Math.round(t.avgChars / t.success);
    }
  }

  // Celkové metriky
  const successful = interactions.filter((i: any) => i.status === 'ok');
  const totalDuration = successful.reduce((acc: number, i: any) => acc + i.duration, 0);
  const totalChars = successful.reduce((acc: number, i: any) => acc + i.chars, 0);

  return NextResponse.json({
    generated: data.generated,
    total: data.total,
    successful: data.successful,
    failed: data.failed,
    successRate: Math.round((data.successful / data.total) * 100),
    avgDuration: successful.length > 0 ? Math.round((totalDuration / successful.length) * 10) / 10 : 0,
    avgChars: successful.length > 0 ? Math.round(totalChars / successful.length) : 0,
    totalDuration: Math.round(totalDuration),
    totalChars,
    byTool,
  });
}
