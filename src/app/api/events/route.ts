import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const city = searchParams.get('city');

    const whereClause: any = {};
    
    if (category && category !== 'all') {
      whereClause.category = category;
    }
    if (city && city !== 'All') {
      whereClause.city = city;
    }

    const events = await prisma.event.findMany({
      where: whereClause,
      orderBy: {
        date: 'asc'
      }
    });

    return NextResponse.json({ events }, {
      headers: {
        'Cache-Control': 'no-store, max-age=0'
      }
    });
  } catch (error) {
    console.error("Database query failed:", error);
    return NextResponse.json({ error: "Failed to fetch events from database." }, { status: 500 });
  }
}
