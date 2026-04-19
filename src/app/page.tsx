import Link from 'next/link';

export default function Home() {
  const categories = [
    { name: 'Music Concert', path: 'music', color: '#8b5cf6' },
    { name: 'Health Event', path: 'health', color: '#10b981' },
    { name: 'City Event', path: 'city', color: '#3b82f6' },
    { name: 'College Event', path: 'college', color: '#f59e0b' },
    { name: 'Tech Event', path: 'tech', color: '#6366f1' },
    { name: 'Hackathon', path: 'hackathon', color: '#ef4444' },
  ];

  return (
    <main className="container animate-fade-in" style={{ padding: '4rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '4rem' }}>
      
      {/* Hero Section */}
      <section style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.5rem', padding: '4rem 0' }}>
        <h1 style={{ fontSize: '4rem', lineHeight: 1.1 }}>
          OmniSync Smart Event <br /> <span className="text-gradient">Hub</span>
        </h1>
        <p style={{ fontSize: '1.25rem', color: '#a3a3a3' }}>
          Discover, experience, and manage crowds seamlessly. Powered by AI and real-time insights anywhere in the world.
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '1rem' }}>
          <Link href="#explore" className="btn" style={{ padding: '1rem 2rem', fontSize: '1.1rem' }}>Explore Events</Link>
          <Link href="/ai-manager" className="btn auth-btn" style={{ padding: '1rem 2rem', fontSize: '1.1rem' }}>AI Crowd Manager</Link>
        </div>
      </section>

      {/* Categories Section */}
      <section id="explore">
        <h2 style={{ fontSize: '2rem', marginBottom: '2rem' }}>Experience By Category</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
          {categories.map((cat) => (
            <Link key={cat.path} href={`/events/${cat.path}`}>
              <div className="glass-panel" style={{ padding: '2rem', textAlign: 'center', transition: 'all 0.3s', cursor: 'pointer', borderLeft: `4px solid ${cat.color}` }}>
                <h3 style={{ fontSize: '1.25rem' }}>{cat.name}</h3>
              </div>
            </Link>
          ))}
        </div>
      </section>
      
    </main>
  );
}
