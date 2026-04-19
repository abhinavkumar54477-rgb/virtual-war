import Link from 'next/link';

interface EventCardProps {
  id: string;
  title: string;
  category: string;
  city: string;
  date: string;
  imageUrl: string;
}

export default function EventCard({ id, title, category, city, date, imageUrl }: EventCardProps) {
  return (
    <div className="glass-panel" style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column', transition: 'transform 0.2s', cursor: 'pointer' }}>
      <div style={{ height: '200px', backgroundColor: '#333', backgroundImage: `url(${imageUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
      <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: '0.8rem', textTransform: 'uppercase', color: 'var(--accent)', fontWeight: 700 }}>{category}</span>
          <span style={{ fontSize: '0.8rem', color: '#999' }}>{date}</span>
        </div>
        <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>{title}</h3>
        <p style={{ color: '#ccc', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem' }}>
          📍 {city}
        </p>
        <div style={{ marginTop: '1rem' }}>
          <button className="btn" style={{ width: '100%' }}>View Details</button>
        </div>
      </div>
    </div>
  );
}
