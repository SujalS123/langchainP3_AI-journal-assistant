import React, { useState } from 'react';
import { getWeeklySummary, getWeeklyInsights } from '../services/journalService';

const Reflections = () => {
  const [summary, setSummary] = useState('');
  const [insights, setInsights] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchSummary = async () => {
    setLoading(true);
    try {
      const result = await getWeeklySummary();
      setSummary(result.response || 'No summary available yet. Write some journal entries first!');
    } catch (error) {
      console.error('Error fetching summary:', error);
      setSummary('Error loading summary. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const fetchInsights = async () => {
    setLoading(true);
    try {
      const result = await getWeeklyInsights();
      setInsights(result.insights || 'No insights available yet. Write some journal entries first!');
    } catch (error) {
      console.error('Error fetching insights:', error);
      setInsights('Error loading insights. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '24px' }}>
      <div style={{ marginBottom: '32px', padding: '24px', backgroundColor: '#f0fdf4', borderRadius: '16px', border: '1px solid #bbf7d0' }}>
        <h2 style={{ fontSize: '28px', fontWeight: '700', color: '#14532d', marginBottom: '8px' }}>AI Insights</h2>
        <p style={{ color: '#16a34a', fontSize: '14px' }}>Get weekly summaries and insights from your journal</p>
      </div>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <div style={{ backgroundColor: 'white', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '24px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#1f2937' }}>Weekly Summary</h3>
            <button
              onClick={fetchSummary}
              disabled={loading}
              style={{ padding: '8px 16px', backgroundColor: '#3b82f6', color: 'white', borderRadius: '8px', border: 'none', fontWeight: '500', cursor: 'pointer', opacity: loading ? 0.5 : 1 }}
            >
              {loading ? 'Loading...' : 'Generate'}
            </button>
          </div>
          {summary && (
            <div style={{ backgroundColor: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: '12px', padding: '16px' }}>
              <div style={{ color: '#1e40af', fontSize: '14px', lineHeight: '1.6' }}>
                {summary.split('\n').map((line, i) => (
                  <p key={i} style={{ marginBottom: '8px' }}>{line}</p>
                ))}
              </div>
            </div>
          )}
        </div>

        <div style={{ backgroundColor: 'white', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '24px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#1f2937' }}>Weekly Insights</h3>
            <button
              onClick={fetchInsights}
              disabled={loading}
              style={{ padding: '8px 16px', backgroundColor: '#10b981', color: 'white', borderRadius: '8px', border: 'none', fontWeight: '500', cursor: 'pointer', opacity: loading ? 0.5 : 1 }}
            >
              {loading ? 'Loading...' : 'Generate'}
            </button>
          </div>
          {insights && (
            <div style={{ backgroundColor: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '12px', padding: '16px' }}>
              <div style={{ color: '#15803d', fontSize: '14px', lineHeight: '1.6' }}>
                {insights.split('\n').map((line, i) => (
                  <p key={i} style={{ marginBottom: '8px' }}>{line}</p>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Reflections;