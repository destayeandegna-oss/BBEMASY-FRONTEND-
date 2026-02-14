import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FiLock, FiUser, FiArrowRight } from 'react-icons/fi';
import toast from 'react-hot-toast';
import { useAuth } from './services/authService';

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      // Simple hardcoded check for demonstration
      if (email === 'sysadmin@hu.edu.et' && password === 'sysadmin') {
        login({ name: 'System Admin', email: 'sysadmin@hu.edu.et', role: 'admin' });
        toast.success('Login successful');
        navigate('/admin');
      } else if (email === 'admin@hu.edu.et' && password === 'admin') {
        login({ name: 'HR Manager', email: 'admin@hu.edu.et', role: 'hr' });
        toast.success('Login successful');
        navigate('/hr');
      } else if (email === 'employee@hu.edu.et' && password === 'employee') {
        login({ name: 'John Doe', email: 'employee@hu.edu.et', role: 'employee' });
        toast.success('Login successful');
        navigate('/employee');
      } else {
        toast.error('Invalid credentials');
      }
    }, 1000);
  };

  return (
    <div className="login-page">
      <div className="login-box">
        <div className="login-logo">
          <h2>BBMSS Login</h2>
          <p style={{ color: '#666' }}>Enter your credentials to access the portal</p>
        </div>

        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label>Email Address</label>
            <div style={{ position: 'relative' }}>
              <FiUser style={{ position: 'absolute', left: '10px', top: '10px', color: '#999' }} />
              <input 
                type="email" 
                className="form-control"
                style={{ paddingLeft: '35px' }}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@hu.edu.et"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '5px' }}>
              <label style={{ marginBottom: 0 }}>Password</label>
              <Link to="/forgot-password" style={{ fontSize: '12px', color: '#1a237e', textDecoration: 'none' }}>Forgot Password?</Link>
            </div>
            <div style={{ position: 'relative' }}>
              <FiLock style={{ position: 'absolute', left: '10px', top: '10px', color: '#999' }} />
              <input 
                type="password" 
                className="form-control"
                style={{ paddingLeft: '35px' }}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="admin"
                required
              />
            </div>
          </div>

          <div className="form-group" style={{ display: 'flex', alignItems: 'center' }}>
            <input 
              type="checkbox" 
              id="remember" 
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              style={{ marginRight: '8px', cursor: 'pointer' }}
            />
            <label htmlFor="remember" style={{ margin: 0, cursor: 'pointer', fontSize: '14px', color: '#666' }}>Remember me</label>
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px' }} disabled={loading}>
            {loading ? 'Logging in...' : <>Login <FiArrowRight /></>}
          </button>
        </form>
        
        <div style={{ marginTop: '20px', textAlign: 'center', fontSize: '12px', color: '#666' }}>
          <p>System Admin: <strong>sysadmin@hu.edu.et</strong> / <strong>sysadmin</strong></p>
          <p>HR Manager: <strong>admin@hu.edu.et</strong> / <strong>admin</strong></p>
          <p>Employee: <strong>employee@hu.edu.et</strong> / <strong>employee</strong></p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;