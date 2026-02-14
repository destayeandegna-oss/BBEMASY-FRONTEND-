import React from 'react';
import { Link } from 'react-router-dom';
import { FiUsers, FiClock, FiShield } from 'react-icons/fi';
import { MdFingerprint } from 'react-icons/md';

const HomePage = () => {
  return (
    <div style={{ minHeight: '100vh', background: '#f5f7fb' }}>
      {/* Navigation */}
      <nav style={{ background: 'white', padding: '15px 50px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <MdFingerprint size={30} color="#1a237e" />
            <h2 style={{ color: '#1a237e' }}>BBMSS - HU-IOT</h2>
          </div>
          <div>
            <Link to="/login">
              <button className="btn btn-primary">Login</button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section style={{ 
        background: 'linear-gradient(135deg, #1a237e 0%, #0d1b3e 100%)',
        color: 'white',
        padding: '100px 50px',
        textAlign: 'center'
      }}>
        <h1 style={{ fontSize: '48px', marginBottom: '20px' }}>
          Biometric-Based Employee Attendance Management System
        </h1>
        <p style={{ fontSize: '20px', marginBottom: '30px', opacity: 0.9 }}>
          Secure, Accurate, and Efficient Attendance Tracking for Hawassa University Institute of Technology
        </p>
        <Link to="/login">
          <button className="btn" style={{ background: 'white', color: '#1a237e', padding: '15px 40px', fontSize: '18px' }}>
            Get Started
          </button>
        </Link>
      </section>

      {/* Features Section */}
      <section style={{ padding: '80px 50px' }}>
        <h2 style={{ textAlign: 'center', fontSize: '36px', marginBottom: '50px', color: '#333' }}>
          Key Features
        </h2>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '30px' }}>
          <div className="stat-card" style={{ textAlign: 'center', padding: '40px 20px' }}>
            <MdFingerprint size={50} color="#1a237e" />
            <h3 style={{ margin: '20px 0' }}>Biometric Authentication</h3>
            <p style={{ color: '#666' }}>Secure fingerprint and facial recognition for accurate employee verification</p>
          </div>

          <div className="stat-card" style={{ textAlign: 'center', padding: '40px 20px' }}>
            <FiClock size={50} color="#28a745" />
            <h3 style={{ margin: '20px 0' }}>Real-time Tracking</h3>
            <p style={{ color: '#666' }}>Instant check-in/out recording with timestamp accuracy</p>
          </div>

          <div className="stat-card" style={{ textAlign: 'center', padding: '40px 20px' }}>
            <FiUsers size={50} color="#ff9800" />
            <h3 style={{ margin: '20px 0' }}>Employee Management</h3>
            <p style={{ color: '#666' }}>Comprehensive employee profiles and attendance history</p>
          </div>

          <div className="stat-card" style={{ textAlign: 'center', padding: '40px 20px' }}>
            <FiShield size={50} color="#dc3545" />
            <h3 style={{ margin: '20px 0' }}>Role-Based Access</h3>
            <p style={{ color: '#666' }}>Secure, role-specific dashboards for employees, HR, and admins</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ background: '#333', color: 'white', padding: '30px 50px', textAlign: 'center' }}>
        <p>© 2025 Hawassa University Institute of Technology - Department of Computer Science</p>
        <p style={{ marginTop: '10px', opacity: 0.8 }}>Biometric-Based Employee Attendance Management System</p>
      </footer>
    </div>
  );
};

export default HomePage;