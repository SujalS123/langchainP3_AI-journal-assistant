import React, { useState } from 'react';
import { useAuthStore } from '../store/useAuthStore';
import { registerUser } from '../services/authService';

const Register = ({ onRegister, switchToLogin }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const setAuth = useAuthStore((state) => state.setAuth);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await registerUser(formData);
      setAuth(response.access_token, { email: formData.email, name: formData.name });
      onRegister();
    } catch (error) {
      setError(error.response?.data?.detail || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(to bottom right, #f0fdf4, #fef7ff)', padding: '24px' }}>
      <div style={{ maxWidth: '400px', width: '100%', backgroundColor: 'white', borderRadius: '16px', padding: '32px', boxShadow: '0 10px 25px rgba(0,0,0,0.1)', border: '1px solid #e2e8f0' }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{ width: '64px', height: '64px', background: 'linear-gradient(to right, #10b981, #8b5cf6)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
            <svg style={{ width: '28px', height: '28px', color: 'white' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
            </svg>
          </div>
          <h2 style={{ fontSize: '28px', fontWeight: '700', color: '#1f2937', marginBottom: '8px' }}>
            Join AI Journal
          </h2>
          <p style={{ color: '#6b7280', fontSize: '14px' }}>Create your personal AI companion</p>
        </div>
        
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '8px' }}>Full Name</label>
              <input
                type="text"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                style={{ width: '100%', padding: '12px 16px', border: '1px solid #d1d5db', borderRadius: '12px', fontSize: '14px', backgroundColor: '#f9fafb', outline: 'none' }}
                required
              />
            </div>
            
            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '8px' }}>Email Address</label>
              <input
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                style={{ width: '100%', padding: '12px 16px', border: '1px solid #d1d5db', borderRadius: '12px', fontSize: '14px', backgroundColor: '#f9fafb', outline: 'none' }}
                required
              />
            </div>
            
            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '8px' }}>Password</label>
              <input
                type="password"
                placeholder="Create a secure password (min 6 characters)"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                style={{ width: '100%', padding: '12px 16px', border: '1px solid #d1d5db', borderRadius: '12px', fontSize: '14px', backgroundColor: '#f9fafb', outline: 'none' }}
                required
                minLength={6}
              />
            </div>
          </div>
          
          {error && (
            <div style={{ backgroundColor: '#fef2f2', border: '1px solid #fecaca', color: '#dc2626', padding: '12px 16px', borderRadius: '12px', fontSize: '14px', textAlign: 'center' }}>
              {error}
            </div>
          )}
          
          <button
            type="submit"
            disabled={loading}
            style={{ width: '100%', padding: '12px 24px', background: 'linear-gradient(to right, #10b981, #8b5cf6)', color: 'white', borderRadius: '12px', border: 'none', fontWeight: '500', cursor: 'pointer', opacity: loading ? 0.5 : 1, fontSize: '14px' }}
          >
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>
        
        <div style={{ marginTop: '24px', textAlign: 'center' }}>
          <p style={{ color: '#6b7280', fontSize: '14px' }}>
            Already have an account?{' '}
            <button
              onClick={switchToLogin}
              style={{ color: '#10b981', fontWeight: '500', backgroundColor: 'transparent', border: 'none', cursor: 'pointer', fontSize: '14px' }}
            >
              Sign in here →
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;