import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FiFingerprint, FiCamera, FiArrowLeft } from 'react-icons/fi';
import toast from 'react-hot-toast';
import { useAuth } from '../../services/authService';

const BiometricLogin = () => {
  const [method, setMethod] = useState('fingerprint');
  const [scanning, setScanning] = useState(false);
  const navigate = useNavigate();
  const { biometricLogin } = useAuth();

  const handleBiometricScan = async () => {
    setScanning(true);
    
    // Simulate biometric scan
    toast.loading('Scanning biometric data...', { id: 'scan' });
    
    setTimeout(() => {
      toast.success('Biometric verification successful!', { id: 'scan' });
      setScanning(false);
      
      // Mock successful login
      const user = {
        id: 'emp001',
        name: 'John Doe',
        email: 'john@hu.edu.et',
        role: 'employee'
      };
      
      biometricLogin(user);
      navigate('/employee/dashboard');
    }, 3000);
  };

  return (
    <div className="login-page">
      <div className="login-box">
        <Link to="/login" style={{ textDecoration: 'none', color: '#666' }}>
          <FiArrowLeft /> Back to Login
        </Link>

        <div className="login-logo" style={{ marginTop: '20px' }}>
          <FiFingerprint size={70} color="#1a237e" />
          <h2>Biometric Login</h2>
          <p>Select your preferred method</p>
        </div>

        <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
          <button
            className={`btn ${method === 'fingerprint' ? 'btn-primary' : ''}`}
            style={{ flex: 1 }}
            onClick={() => setMethod('fingerprint')}
          >
            <FiFingerprint /> Fingerprint
          </button>
          <button
            className={`btn ${method === 'face' ? 'btn-primary' : ''}`}
            style={{ flex: 1 }}
            onClick={() => setMethod('face')}
          >
            <FiCamera /> Face ID
          </button>
        </div>

        <div style={{ 
          border: '2px dashed #ccc', 
          borderRadius: '10px', 
          padding: '40px',
          textAlign: 'center',
          marginBottom: '20px',
          background: scanning ? '#f0f8ff' : 'white'
        }}>
          {method === 'fingerprint' ? (
            <FiFingerprint size={80} color={scanning ? '#1a237e' : '#ccc'} />
          ) : (
            <FiCamera size={80} color={scanning ? '#1a237e' : '#ccc'} />
          )}
          
          <p style={{ marginTop: '10px', color: '#666' }}>
            {scanning 
              ? 'Scanning... Please wait' 
              : `Place your ${method === 'fingerprint' ? 'finger' : 'face'} for scanning`}
          </p>
        </div>

        <button
          className="btn btn-primary"
          style={{ width: '100%' }}
          onClick={handleBiometricScan}
          disabled={scanning}
        >
          {scanning ? 'Scanning...' : 'Start Scan'}
        </button>

        <p style={{ marginTop: '20px', fontSize: '12px', color: '#666', textAlign: 'center' }}>
          For demo purposes, biometric verification is simulated.<br />
          In production, this will interface with actual biometric devices.
        </p>
      </div>
    </div>
  );
};

export default BiometricLogin;