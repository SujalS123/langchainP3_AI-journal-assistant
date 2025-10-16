import React, { useState, useRef, useEffect } from 'react';
import { chatWithAI } from '../services/journalService';

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const chatContainerRef = useRef(null);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      scrollToBottom();
    }, 100);
    return () => clearTimeout(timer);
  }, [messages]);

  useEffect(() => {
    scrollToBottom();
  }, [loading]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { type: 'user', content: input, timestamp: new Date() };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const result = await chatWithAI(input);
      const aiMessage = { type: 'ai', content: result.response || 'No response received', timestamp: new Date() };
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      let errorMsg = 'Sorry, I encountered an error. Please try again.';
      if (error.response?.status === 401) {
        errorMsg = 'Please log in again to continue.';
      } else if (error.code === 'NETWORK_ERROR') {
        errorMsg = 'Network error. Please check your connection.';
      }
      const errorMessage = { type: 'ai', content: errorMsg, timestamp: new Date() };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div style={{ padding: '24px', backgroundColor: '#fef7ff', borderBottom: '1px solid #e9d5ff' }}>
        <h2 style={{ fontSize: '24px', fontWeight: '600', color: '#581c87', marginBottom: '8px' }}>AI Chat</h2>
        <p style={{ color: '#7c3aed', fontSize: '14px' }}>Have a conversation with your AI assistant</p>
      </div>
      
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', backgroundColor: '#f8fafc' }}>
        <div 
          ref={chatContainerRef}
          style={{ flex: 1, padding: '20px', overflowY: 'auto' }}
        >
          {messages.length === 0 ? (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ width: '60px', height: '60px', backgroundColor: '#e0e7ff', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                  <svg style={{ width: '24px', height: '24px', color: '#6366f1' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <p style={{ color: '#64748b', fontSize: '14px' }}>Start chatting with your AI assistant</p>
              </div>
            </div>
          ) : (
            <>
              {messages.map((message, index) => (
                <div key={index} style={{ display: 'flex', justifyContent: message.type === 'user' ? 'flex-end' : 'flex-start', marginBottom: '16px' }}>
                  {message.type === 'user' ? (
                    <div style={{ maxWidth: '300px', backgroundColor: '#6366f1', color: 'white', padding: '12px 16px', borderRadius: '16px', fontSize: '14px' }}>
                      {message.content}
                    </div>
                  ) : (
                    <div style={{ maxWidth: '70%' }}>
                      <div style={{ backgroundColor: 'white', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '16px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
                        <div style={{ color: '#334155', fontSize: '14px', lineHeight: '1.5' }}>
                          {message.content.split('\n').map((line, i) => (
                            <p key={i} style={{ marginBottom: '8px' }}>{line}</p>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
              {loading && (
                <div style={{ display: 'flex', justifyContent: 'flex-start', marginBottom: '16px' }}>
                  <div style={{ backgroundColor: '#f1f5f9', border: '1px solid #e2e8f0', padding: '12px 16px', borderRadius: '16px' }}>
                    <span style={{ fontSize: '14px', color: '#64748b' }}>AI is thinking...</span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </>
          )}
        </div>

        <div style={{ backgroundColor: 'white', borderTop: '1px solid #e2e8f0', padding: '20px' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', gap: '12px' }}>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              style={{ flex: 1, padding: '12px 16px', border: '1px solid #d1d5db', borderRadius: '12px', resize: 'none', minHeight: '44px', fontSize: '14px', outline: 'none' }}
              rows="1"
            />
            <button
              onClick={handleSend}
              disabled={!input.trim() || loading}
              style={{ padding: '12px 24px', backgroundColor: '#6366f1', color: 'white', borderRadius: '12px', border: 'none', fontWeight: '500', cursor: 'pointer', opacity: (!input.trim() || loading) ? 0.5 : 1 }}
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;