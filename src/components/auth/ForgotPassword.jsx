import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiMail, FiArrowLeft } from 'react-icons/fi';
import toast from 'react-hot-toast';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      toast.success('Reset link sent to your email');
    }, 1500);
  };

  return (
    <div className="login-page">
      <div className="login-box">
        <div className="login-logo">
          <h2>Forgot Password</h2>
          <p style={{ color: 'var(--text-secondary)' }}>Enter your email to reset your password</p>
        </div>

        {!submitted ? (
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Email Address</label>
              <div style={{ position: 'relative' }}>
                <FiMail style={{ position: 'absolute', left: '10px', top: '12px', color: 'var(--text-secondary)' }} />
                <input 
                  type="email" 
                  className="form-control"
                  style={{ paddingLeft: '35px' }}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  required
                />
              </div>
            </div>

            <button type="submit" className="btn btn-primary" style={{ width: '100%' }} disabled={loading}>
              {loading ? 'Sending...' : 'Send Reset Link'}
            </button>
          </form>
        ) : (
          <div style={{ textAlign: 'center' }}>
            <div style={{ 
              width: '60px', height: '60px', background: 'rgba(6, 214, 160, 0.1)', 
              borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
              margin: '0 auto 20px', color: 'var(--success-color)'
            }}>
              <FiMail size={30} />
            </div>
            <h3 style={{ margin: '0 0 10px' }}>Check your email</h3>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '20px' }}>
              We have sent a password reset link to <strong>{email}</strong>
            </p>
            <button onClick={() => setSubmitted(false)} className="btn btn-outline" style={{ width: '100%' }}>
              Resend Email
            </button>
          </div>
        )}

        <div style={{ marginTop: '20px', textAlign: 'center' }}>
          <Link to="/login" style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', textDecoration: 'none', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
            <FiArrowLeft /> Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;