import React from 'react';

const Sidebar = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { 
      id: 'journal', 
      name: 'Write Entry', 
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
        </svg>
      ),
      description: 'Create new journal entries' 
    },
    { 
      id: 'chat', 
      name: 'AI Chat', 
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      ),
      description: 'Conversation with your AI' 
    },
    { 
      id: 'reflections', 
      name: 'Insights', 
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
      description: 'AI insights & summaries' 
    },
    { 
      id: 'history', 
      name: 'History', 
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      description: 'View past entries' 
    },
  ];

  return (
    <div style={{ width: '256px', backgroundColor: '#f8fafc', height: '100vh', borderRight: '1px solid #e2e8f0' }}>
      <div style={{ padding: '24px' }}>
        <div style={{ marginBottom: '32px' }}>
          <h2 style={{ fontSize: '18px', fontWeight: '600', color: '#1f2937', marginBottom: '4px' }}>Your Journal</h2>
          <p style={{ fontSize: '14px', color: '#6b7280' }}>AI-powered assistant</p>
        </div>
        
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                padding: '12px',
                fontSize: '14px',
                fontWeight: '500',
                borderRadius: '12px',
                border: 'none',
                cursor: 'pointer',
                backgroundColor: activeTab === tab.id ? '#6366f1' : 'transparent',
                color: activeTab === tab.id ? 'white' : '#374151'
              }}
            >
              <span style={{ marginRight: '12px', width: '16px', height: '16px', color: activeTab === tab.id ? 'white' : '#6b7280' }}>
                {tab.icon}
              </span>
              <div style={{ textAlign: 'left', flex: 1 }}>
                <div style={{ fontWeight: '500' }}>{tab.name}</div>
                <div style={{ fontSize: '12px', marginTop: '2px', color: activeTab === tab.id ? '#c7d2fe' : '#6b7280' }}>
                  {tab.description}
                </div>
              </div>
            </button>
          ))}
        </nav>
        
        <div style={{ marginTop: '32px', padding: '16px', background: 'linear-gradient(to bottom right, #eff6ff, #f3e8ff)', borderRadius: '12px', border: '1px solid #c7d2fe' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ width: '32px', height: '32px', backgroundColor: '#ddd6fe', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 8px' }}>
              <svg style={{ width: '16px', height: '16px', color: '#6366f1' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <p style={{ fontSize: '12px', color: '#4c1d95', fontWeight: '500' }}>
              Your AI learns from every interaction
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;