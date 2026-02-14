import React, { useState } from 'react';
import { FiHome, FiUsers, FiClock, FiCheckSquare, FiCpu, FiBarChart2, FiMenu, FiLogOut } from 'react-icons/fi';
import { Toaster } from 'react-hot-toast';
import { Routes, Route, Navigate, NavLink } from 'react-router-dom';
import { useAuth } from '../../services/authService';
import Breadcrumbs from '../common/Breadcrumbs';
import HRDashboard from './HRDashboard';
import EmployeeManagement from './EmployeeManagement';
import AttendanceManagement from './AttendanceManagement';
import LeaveApproval from './LeaveApproval';
import BiometricEnrollment from './BiometricEnrollment';
import Reports from './Reports';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("HR Component Error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '20px', color: '#721c24', backgroundColor: '#f8d7da', border: '1px solid #f5c6cb', borderRadius: '5px', margin: '20px' }}>
          <h3>Something went wrong loading this component.</h3>
          <p>{this.state.error && this.state.error.toString()}</p>
          <p>Please ensure you have installed dependencies: <code>npm install react-icons react-hot-toast recharts</code></p>
        </div>
      );
    }

    return this.props.children; 
  }
}

const HRMain = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { logout } = useAuth();

  const menuItems = [
    { path: 'dashboard', label: 'Dashboard', icon: <FiHome /> },
    { path: 'employees', label: 'Employees', icon: <FiUsers /> },
    { path: 'attendance', label: 'Attendance', icon: <FiClock /> },
    { path: 'leave-approval', label: 'Leave Approval', icon: <FiCheckSquare /> },
    { path: 'biometric-enrollment', label: 'Biometric', icon: <FiCpu /> },
    { path: 'reports', label: 'Reports', icon: <FiBarChart2 /> },
  ];

  return (
    <ErrorBoundary>
    <div style={{ display: 'flex', minHeight: '100vh', fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" }}>
      <Toaster position="top-right" />
      
      {/* Sidebar */}
      <div style={{ 
        width: isSidebarOpen ? '260px' : '80px', 
        background: '#1a237e', 
        color: 'white', 
        transition: 'width 0.3s',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        boxShadow: '2px 0 5px rgba(0,0,0,0.1)'
      }}>
        <div style={{ padding: '20px', display: 'flex', alignItems: 'center', justifyContent: isSidebarOpen ? 'space-between' : 'center', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
          {isSidebarOpen && <h2 style={{ margin: 0, fontSize: '20px', whiteSpace: 'nowrap' }}>BBMSS HR</h2>}
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}>
            <FiMenu size={24} />
          </button>
        </div>

        <nav style={{ flex: 1, padding: '20px 0', display: 'flex', flexDirection: 'column' }}>
          {menuItems.map(item => (
            <NavLink
              key={item.path}
              to={item.path}
              title={!isSidebarOpen ? item.label : ''}
              style={({ isActive }) => ({
                display: 'flex',
                alignItems: 'center',
                width: '100%',
                padding: '15px 25px',
                background: isActive ? 'rgba(255,255,255,0.1)' : 'transparent',
                border: 'none',
                borderLeft: isActive ? '4px solid #4fc3f7' : '4px solid transparent',
                color: 'white',
                textDecoration: 'none',
                cursor: 'pointer',
                textAlign: isSidebarOpen ? 'left' : 'center',
                justifyContent: isSidebarOpen ? 'flex-start' : 'center',
                fontSize: '16px',
                transition: 'all 0.2s',
                whiteSpace: 'nowrap'
              })}
            >
              <span style={{ marginRight: isSidebarOpen ? '15px' : '0', fontSize: '20px', display: 'flex' }}>{item.icon}</span>
              {isSidebarOpen && item.label}
            </NavLink>
          ))}
          
          <button
            onClick={logout}
            title={!isSidebarOpen ? 'Logout' : ''}
            style={{
              display: 'flex',
              alignItems: 'center',
              width: '100%',
              padding: '15px 25px',
              background: 'transparent',
              border: 'none',
              borderLeft: '4px solid transparent',
              color: '#ffcdd2',
              cursor: 'pointer',
              textAlign: isSidebarOpen ? 'left' : 'center',
              justifyContent: isSidebarOpen ? 'flex-start' : 'center',
              fontSize: '16px',
              transition: 'all 0.2s',
              whiteSpace: 'nowrap',
              marginTop: 'auto'
            }}
          >
            <span style={{ marginRight: isSidebarOpen ? '15px' : '0', fontSize: '20px', display: 'flex' }}><FiLogOut /></span>
            {isSidebarOpen && 'Logout'}
          </button>
        </nav>

        <div style={{ padding: '20px', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', justifyContent: isSidebarOpen ? 'flex-start' : 'center' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#3949ab', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              AD
            </div>
            {isSidebarOpen && (
              <div style={{ overflow: 'hidden' }}>
                <div style={{ fontWeight: 'bold', whiteSpace: 'nowrap' }}>Admin User</div>
                <div style={{ fontSize: '12px', opacity: 0.7, whiteSpace: 'nowrap' }}>admin@hu.edu.et</div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, background: '#f5f5f5', height: '100vh', overflowY: 'auto' }}>
        <div style={{ padding: '30px' }}>
            <Breadcrumbs />
            <Routes>
              <Route path="dashboard" element={<HRDashboard />} />
              <Route path="employees" element={<EmployeeManagement />} />
              <Route path="attendance" element={<AttendanceManagement />} />
              <Route path="leave-approval" element={<LeaveApproval />} />
              <Route path="biometric-enrollment" element={<BiometricEnrollment />} />
              <Route path="reports" element={<Reports />} />
              <Route path="/" element={<Navigate to="dashboard" replace />} />
            </Routes>
        </div>
      </div>
    </div>
    </ErrorBoundary>
  );
};

export default HRMain;