import Link from 'next/link';

export default function Navbar() {
  return (
    <header style={{ padding: '1rem' }}>
      <div className="container glass-panel" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 2rem' }}>
        <div className="logo" style={{ fontSize: '1.5rem', fontWeight: 800, fontFamily: 'Outfit, sans-serif' }}>
          <Link href="/">Omni<span className="text-gradient">Sync</span></Link>
        </div>
        <nav style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
          <Link href="/" style={{ fontWeight: 500 }}>Home</Link>
          <Link href="/events/music" style={{ fontWeight: 500 }}>Events</Link>
          <Link href="/ai-manager" style={{ fontWeight: 500 }}>AI Manager</Link>
          <button className="btn auth-btn">Sign In</button>
        </nav>
      </div>
    </header>
  );
}
