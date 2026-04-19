import { NextResponse } from 'next/server';

const MOCK_EVENTS = [
  { id: '1', title: 'Global Tech Summit', category: 'tech', city: 'San Francisco', date: 'Oct 15, 2026', imageUrl: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=500&q=80' },
  { id: '2', title: 'Neon Nights Music', category: 'music', city: 'London', date: 'Nov 02, 2026', imageUrl: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=500&q=80' },
  { id: '3', title: 'Health & Wellness Expo', category: 'health', city: 'New York', date: 'Jan 10, 2027', imageUrl: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=500&q=80' },
  { id: '4', title: 'City Lights Festival', category: 'city', city: 'Tokyo', date: 'Dec 05, 2026', imageUrl: 'https://images.unsplash.com/photo-1514565131-fce0801e5785?w=500&q=80' },
  { id: '5', title: 'University Hackathon', category: 'hackathon', city: 'Boston', date: 'Feb 20, 2027', imageUrl: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=500&q=80' },
  { id: '6', title: 'Campus Spring Fest', category: 'college', city: 'Austin', date: 'Mar 15, 2027', imageUrl: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=500&q=80' },
  { id: '7', title: 'AI Frontier 2026', category: 'tech', city: 'London', date: 'Sep 25, 2026', imageUrl: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=500&q=80' },
  { id: '8', title: 'Indie Rock Concert', category: 'music', city: 'Austin', date: 'Oct 30, 2026', imageUrl: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=500&q=80' }
];

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');
  const city = searchParams.get('city');

  let filtered = MOCK_EVENTS;
  
  if (category) {
    filtered = filtered.filter(e => e.category === category);
  }
  if (city && city !== 'All') {
    filtered = filtered.filter(e => e.city === city);
  }

  // To let client components properly re-render without complex cache-busting required here
  return NextResponse.json({ events: filtered }, {
    headers: {
      'Cache-Control': 'no-store, max-age=0'
    }
  });
}
