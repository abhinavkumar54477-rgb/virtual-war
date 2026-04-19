'use client';
import { useState } from 'react';

export default function AIManager() {
  const [formData, setFormData] = useState({ eventType: 'music', attendees: '5000', venueSize: '1000' });
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    try {
      const res = await fetch('/api/ai-crowd-manager', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      setResult(data);
    } catch(err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="container animate-fade-in" style={{ padding: '4rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '3rem' }}>
      <header style={{ textAlign: 'center' }}>
        <h1 style={{ fontSize: '3rem' }}>AI <span className="text-gradient">Crowd Manager</span></h1>
        <p style={{ color: '#999', marginTop: '1rem' }}>Test your event parameters and receive real-time, AI-powered logistics & security recommendations.</p>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2rem', alignItems: 'start' }}>
        <form className="glass-panel" onSubmit={handleSubmit} style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label style={{ fontWeight: 500 }}>Event Type</label>
            <select 
              value={formData.eventType} 
              onChange={e => setFormData({...formData, eventType: e.target.value})}
              style={{ padding: '0.75rem', borderRadius: '8px', background: 'var(--surface)', border: '1px solid var(--border)', color: 'white', outline: 'none' }}
            >
              <option value="music">Music Concert</option>
              <option value="health">Health & Wellness</option>
              <option value="city">City Event</option>
              <option value="college">College/University</option>
              <option value="tech">Tech/Hackathon</option>
            </select>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label style={{ fontWeight: 500 }}>Expected Attendees</label>
            <input 
              type="number" 
              value={formData.attendees} 
              onChange={e => setFormData({...formData, attendees: e.target.value})}
              style={{ padding: '0.75rem', borderRadius: '8px', background: 'var(--surface)', border: '1px solid var(--border)', color: 'white', outline: 'none' }}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label style={{ fontWeight: 500 }}>Venue Size (Sq Meters)</label>
            <input 
              type="number" 
              value={formData.venueSize} 
              onChange={e => setFormData({...formData, venueSize: e.target.value})}
              style={{ padding: '0.75rem', borderRadius: '8px', background: 'var(--surface)', border: '1px solid var(--border)', color: 'white', outline: 'none' }}
            />
          </div>

          <button type="submit" className="btn" disabled={loading} style={{ marginTop: '1rem', opacity: loading ? 0.7 : 1 }}>
            {loading ? 'Analyzing Logistics...' : 'Generate AI Report'}
          </button>
        </form>

        {result && (
          <div className="glass-panel animate-fade-in" style={{ padding: '2rem', borderTop: `4px solid ${result.riskLevel === 'High' ? '#ef4444' : result.riskLevel === 'Moderate' ? '#f59e0b' : '#10b981'}` }}>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>AI Recommendations Report</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div>
                <span style={{ fontSize: '0.9rem', color: '#999', textTransform: 'uppercase' }}>Risk Level</span>
                <p style={{ fontSize: '1.2rem', fontWeight: 700, color: result.riskLevel === 'High' ? '#ef4444' : result.riskLevel === 'Moderate' ? '#f59e0b' : '#10b981' }}>{result.riskLevel}</p>
              </div>
              
              <div>
                <span style={{ fontSize: '0.9rem', color: '#999', textTransform: 'uppercase' }}>Predicted Crowd Flow</span>
                <p>{result.predictedFlow}</p>
              </div>
              
              <div>
                <span style={{ fontSize: '0.9rem', color: '#999', textTransform: 'uppercase' }}>Actionable Strategies</span>
                <ul style={{ paddingLeft: '1.5rem', marginTop: '0.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {result.suggestions.map((s: string, i: number) => (
                    <li key={i}>{s}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
