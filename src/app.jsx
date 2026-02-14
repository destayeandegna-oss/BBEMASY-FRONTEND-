import React, { Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import ProtectedRoute from './components/common/ProtectedRoute';
import LoginPage from './LoginPage';

// Lazy load components
const HRPage = React.lazy(() => import('./HRPage'));
const AdminPage = React.lazy(() => import('./AdminPage'));
const HomePage = React.lazy(() => import('./HomePage'));
const EmployeePage = React.lazy(() => import('./EmployeePage'));
const DepartmentHeadPage = React.lazy(() => import('./DepartmentHeadPage'));
const ForgotPassword = React.lazy(() => import('./components/auth/ForgotPassword'));
const ResetPassword = React.lazy(() => import('./components/auth/ResetPassword'));

class AppErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '20px', color: 'red', fontFamily: 'sans-serif' }}>
          <h2>Something went wrong loading the application.</h2>
          <p><strong>Error:</strong> {this.state.error && this.state.error.toString()}</p>
        </div>
      );
    }
    return this.props.children;
  }
}

function App() {
  return (
    <AppErrorBoundary>
      <div className="App">
        <Toaster position="top-right" />
        <Suspense fallback={<div style={{ padding: '20px' }}>Loading...</div>}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/hr/*" element={<ProtectedRoute role="hr"><HRPage /></ProtectedRoute>} />
            <Route path="/admin/*" element={<ProtectedRoute role="admin"><AdminPage /></ProtectedRoute>} />
            <Route path="/employee/*" element={<ProtectedRoute role="employee"><EmployeePage /></ProtectedRoute>} />
            <Route path="/department-head/*" element={<ProtectedRoute role="dept_head"><DepartmentHeadPage /></ProtectedRoute>} />
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        </Suspense>
      </div>
    </AppErrorBoundary>
  );
}

export default App;