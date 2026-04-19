'use client';

interface CityFilterProps {
  cities: string[];
  selectedCity: string;
  onChange: (city: string) => void;
}

export default function CityFilter({ cities, selectedCity, onChange }: CityFilterProps) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
      <label htmlFor="city-select" style={{ fontWeight: 500 }}>Location:</label>
      <select 
        id="city-select" 
        value={selectedCity} 
        onChange={(e) => onChange(e.target.value)}
        className="glass-panel"
        style={{ padding: '0.75rem 1rem', border: '1px solid var(--border)', background: 'var(--surface)', color: 'white', borderRadius: '8px', cursor: 'pointer', outline: 'none' }}
      >
        <option value="All">All Cities</option>
        {cities.map(city => (
          <option key={city} value={city}>{city}</option>
        ))}
      </select>
    </div>
  );
}
