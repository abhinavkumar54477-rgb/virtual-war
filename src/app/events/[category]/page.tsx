'use client';
import { useEffect, useState, use } from 'react';
import EventCard from '@/components/EventCard';
import CityFilter from '@/components/CityFilter';

interface Event {
  id: string;
  title: string;
  category: string;
  city: string;
  date: string;
  imageUrl: string;
}

export default function CategoryEvents({ params }: { params: Promise<{ category: string }> }) {
  // Extracting from promise for Next.js 15 route params
  const categoryParams = use(params);
  const category = categoryParams.category;

  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCity, setSelectedCity] = useState('All');

  const CITIES = ['All', 'San Francisco', 'London', 'New York', 'Tokyo', 'Boston', 'Austin'];

  useEffect(() => {
    async function fetchEvents() {
      setLoading(true);
      try {
        const url = new URL('/api/events', window.location.origin);
        if (category && category !== 'all') {
          url.searchParams.append('category', category);
        }
        if (selectedCity && selectedCity !== 'All') {
          url.searchParams.append('city', selectedCity);
        }

        const res = await fetch(url.toString());
        const data = await res.json();
        setEvents(data.events || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchEvents();
  }, [category, selectedCity]);

  return (
    <main className="container animate-fade-in" style={{ padding: '4rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <header style={{ display: 'flex', flexDirection: 'column', gap: '1rem', borderBottom: '1px solid var(--border)', paddingBottom: '2rem' }}>
        <h1 style={{ fontSize: '3rem', textTransform: 'capitalize' }}>
          {category} <span className="text-gradient">Events</span>
        </h1>
        <CityFilter cities={CITIES.filter(c => c !== 'All')} selectedCity={selectedCity} onChange={setSelectedCity} />
      </header>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '4rem 0', color: '#999' }}>Loading events...</div>
      ) : events.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '4rem 0', color: '#999' }}>No events found for the selected location in this category.</div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem' }}>
          {events.map(event => (
            <EventCard key={event.id} {...event} />
          ))}
        </div>
      )}
    </main>
  );
}
