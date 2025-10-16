import React, { useState } from 'react';
import { reflectOnEntry } from '../services/journalService';

const Journal = () => {
  const [entry, setEntry] = useState('');
  const [reflection, setReflection] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleReflect = async () => {
    if (!entry.trim()) return;
    
    setLoading(true);
    try {
      const result = await reflectOnEntry(entry);
      setReflection(result.reflection);
    } catch (error) {
      console.error('Error getting reflection:', error);
      setReflection('Error getting reflection. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setEntry('');
    setReflection(null);
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '24px' }}>
      <div style={{ marginBottom: '32px', padding: '24px', backgroundColor: '#f0f9ff', borderRadius: '16px', border: '1px solid #bae6fd' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
          <div style={{ width: '40px', height: '40px', backgroundColor: '#0ea5e9', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg style={{ width: '20px', height: '20px', color: 'white' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
            </svg>
          </div>
          <div>
            <h2 style={{ fontSize: '28px', fontWeight: '700', color: '#0c4a6e', marginBottom: '4px' }}>Journal Entry</h2>
            <p style={{ color: '#0369a1', fontSize: '14px' }}>Share your thoughts and get AI insights</p>
          </div>
        </div>
      </div>
      
      <div style={{ backgroundColor: 'white', borderRadius: '16px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', border: '1px solid #e2e8f0', padding: '24px', marginBottom: '24px' }}>
        <div style={{ marginBottom: '16px' }}>
          <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '8px' }}>
            Today's Entry
          </label>
          <textarea
            value={entry}
            onChange={(e) => setEntry(e.target.value)}
            placeholder="How was your day? What are you thinking about? Share your thoughts, feelings, and experiences..."
            style={{ width: '100%', height: '200px', padding: '16px', border: '1px solid #d1d5db', borderRadius: '12px', resize: 'none', fontSize: '14px', lineHeight: '1.5', backgroundColor: '#f9fafb', outline: 'none' }}
          />
          <div style={{ marginTop: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '12px', color: '#6b7280' }}>
              {entry.length} characters
            </span>
            <span style={{ fontSize: '12px', color: '#6b7280' }}>
              Tip: Be detailed for better insights
            </span>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '12px' }}>
          <button
            onClick={handleReflect}
            disabled={!entry.trim() || loading}
            style={{ flex: 1, padding: '12px 24px', backgroundColor: '#6366f1', color: 'white', borderRadius: '12px', border: 'none', fontWeight: '500', cursor: 'pointer', opacity: (!entry.trim() || loading) ? 0.5 : 1 }}
          >
            {loading ? 'Getting AI Reflection...' : 'Get AI Reflection'}
          </button>
          
          <button
            onClick={handleClear}
            style={{ padding: '12px 24px', backgroundColor: '#f3f4f6', color: '#374151', borderRadius: '12px', border: 'none', fontWeight: '500', cursor: 'pointer' }}
          >
            Clear
          </button>
        </div>
      </div>

      {reflection && (
        <div style={{ backgroundColor: '#fef3c7', border: '1px solid #fcd34d', borderRadius: '16px', padding: '20px' }}>
          <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#92400e', marginBottom: '12px' }}>AI Reflection</h3>
          <div style={{ color: '#78350f', fontSize: '14px', lineHeight: '1.6' }}>
            {reflection.split('\n').map((line, i) => (
              <p key={i} style={{ marginBottom: '8px' }}>{line}</p>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Journal;