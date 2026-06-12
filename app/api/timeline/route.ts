import { NextResponse } from 'next/server';
import { TIMELINE_EVENTS, TIMELINE_RANGE } from '@/data/companies';

export async function GET() {
  const sorted = [...TIMELINE_EVENTS].sort((a, b) => a.year - b.year);

  return NextResponse.json(
    {
      success: true,
      data: sorted,
      meta: {
        total: sorted.length,
        range: TIMELINE_RANGE,
      },
    },
    {
      headers: {
        'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400',
      },
    }
  );
}
