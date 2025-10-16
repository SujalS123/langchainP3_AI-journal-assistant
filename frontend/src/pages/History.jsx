import React, { useState, useEffect } from 'react';
import { getMemoryHistory } from '../services/journalService';

const History = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchHistory = async () => {
    setLoading(true);
    try {
      const result = await getMemoryHistory();
      setHistory(result.history || []);
    } catch (error) {
      console.error('Error fetching history:', error);
      setHistory([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px', padding: '24px', backgroundColor: '#fef2f2', borderRadius: '16px', border: '1px solid #fecaca' }}>
        <div>
          <h2 style={{ fontSize: '28px', fontWeight: '700', color: '#991b1b', marginBottom: '4px' }}>Journal History</h2>
          <p style={{ color: '#dc2626', fontSize: '14px' }}>View your past entries and reflections</p>
        </div>
        <button
          onClick={fetchHistory}
          disabled={loading}
          style={{ padding: '8px 16px', backgroundColor: '#ef4444', color: 'white', borderRadius: '8px', border: 'none', fontWeight: '500', cursor: 'pointer', opacity: loading ? 0.5 : 1 }}
        >
          {loading ? 'Loading...' : 'Refresh'}
        </button>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '40px' }}>
          <div style={{ width: '40px', height: '40px', backgroundColor: '#e5e7eb', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
            <svg style={{ width: '20px', height: '20px', color: '#6b7280' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <p style={{ color: '#6b7280', fontSize: '14px' }}>Loading history...</p>
        </div>
      ) : history.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '40px' }}>
          <div style={{ width: '60px', height: '60px', backgroundColor: '#f3f4f6', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
            <svg style={{ width: '24px', height: '24px', color: '#6b7280' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <p style={{ color: '#6b7280', fontSize: '14px' }}>No journal entries found. Start writing to see your history!</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {history.map((entry, index) => (
            <div key={index} style={{ backgroundColor: 'white', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '20px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
              <div style={{ marginBottom: '12px' }}>
                <span style={{ fontSize: '12px', color: '#6b7280', backgroundColor: '#f1f5f9', padding: '4px 8px', borderRadius: '6px' }}>
                  {new Date(entry.timestamp).toLocaleDateString()} at {new Date(entry.timestamp).toLocaleTimeString()}
                </span>
              </div>
              <div style={{ marginBottom: '16px' }}>
                <h3 style={{ fontWeight: '600', color: '#1f2937', marginBottom: '8px', fontSize: '14px' }}>Entry:</h3>
                <p style={{ color: '#374151', fontSize: '14px', lineHeight: '1.5' }}>{entry.entry}</p>
              </div>
              {entry.reflection && (
                <div style={{ backgroundColor: '#fef3c7', border: '1px solid #fcd34d', borderRadius: '12px', padding: '16px' }}>
                  <h4 style={{ fontWeight: '600', color: '#92400e', marginBottom: '8px', fontSize: '14px' }}>AI Reflection:</h4>
                  <p style={{ color: '#78350f', fontSize: '14px', lineHeight: '1.5' }}>{entry.reflection}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default History;