import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FiMail, FiLock, FiLogIn } from 'react-icons/fi';
import toast from 'react-hot-toast';
import { useAuth } from '../../services/authService';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const user = await login(email, password);
      toast.success('Login successful!');
      
      // Redirect based on role
      switch (user.role) {
        case 'admin':
          navigate('/admin/dashboard');
          break;
        case 'hr':
          navigate('/hr/dashboard');
          break;
        case 'employee':
          navigate('/employee/dashboard');
          break;
        default:
          navigate('/');
      }
    } catch (error) {
      toast.error('Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-box">
        <div className="login-logo">
          <FiLogIn size={50} color="#1a237e" />
          <h2>BBEAMS - HU-IOT</h2>
          <p>Biometric-Based Employee Attendance System</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email Address</label>
            <div style={{ position: 'relative' }}>
              <FiMail style={{ position: 'absolute', left: '10px', top: '12px', color: '#666' }} />
              <input
                type="email"
                className="form-control"
                style={{ paddingLeft: '35px' }}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
              <FiLock style={{ position: 'absolute', left: '10px', top: '12px', color: '#666' }} />
              <input
                type="password"
                className="form-control"
                style={{ paddingLeft: '35px' }}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <button 
            type="submit" 
            className="btn btn-primary" 
            style={{ width: '100%', marginBottom: '15px' }}
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>

          <Link to="/biometric-login" style={{ textDecoration: 'none' }}>
            <button type="button" className="btn" style={{ width: '100%', background: '#28a745', color: 'white' }}>
              Login with Biometrics
            </button>
          </Link>
        </form>

        <div style={{ marginTop: '20px', textAlign: 'center' }}>
          <small>Demo Credentials:</small><br />
          <small>admin@hu.edu.et / admin123</small><br />
          <small>hr@hu.edu.et / hr123</small><br />
          <small>employee@hu.edu.et / emp123</small>
        </div>
      </div>
    </div>
  );
};

export default Login;