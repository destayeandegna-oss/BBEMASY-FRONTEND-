import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FiUsers, FiServer, FiActivity, FiAlertCircle } from 'react-icons/fi';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const StatCard = ({ icon: Icon, label, value, color, bg }) => (
  <div className="stat-card">
    <div className="stat-card-icon" style={{ background: bg, color: color }}>
      <Icon size={24} />
    </div>
    <div className="stat-card-info">
      <h3>{label}</h3>
      <h2>{value}</h2>
    </div>
  </div>
);

const AdminDashboard = () => {
  const navigate = useNavigate();
  const systemHealthData = [
    { time: '00:00', load: 20 },
    { time: '04:00', load: 15 },
    { time: '08:00', load: 45 },
    { time: '12:00', load: 80 },
    { time: '16:00', load: 70 },
    { time: '20:00', load: 50 },
    { time: '23:59', load: 30 },
  ];

  return (
    <div>
      <h1 style={{ marginBottom: '25px' }}>System Overview</h1>

      <div className="dashboard-cards">
        <StatCard icon={FiUsers} label="Total Users" value="254" color="#1565c0" bg="#e3f2fd" />
        <StatCard icon={FiServer} label="Active Devices" value="12" color="#2e7d32" bg="#e8f5e9" />
        <StatCard icon={FiActivity} label="System Load" value="45%" color="#f57f17" bg="#fff8e1" />
        <StatCard icon={FiAlertCircle} label="System Alerts" value="0" color="#c62828" bg="#ffebee" />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px' }}>
        <div className="table-container">
          <h3>System Load (24h)</h3>
          <div style={{ height: '300px', marginTop: '20px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={systemHealthData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="load" stroke="#1a237e" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="table-container">
          <h3>Recent Audit Logs</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '15px' }}>
            <div style={{ padding: '10px', borderBottom: '1px solid #eee' }}>
              <div style={{ fontWeight: 'bold' }}>User Created</div>
              <div style={{ fontSize: '12px', color: '#666' }}>Admin created user "John Doe"</div>
              <div style={{ fontSize: '10px', color: '#999', marginTop: '5px' }}>2 mins ago</div>
            </div>
            <div style={{ padding: '10px', borderBottom: '1px solid #eee' }}>
              <div style={{ fontWeight: 'bold' }}>Device Offline</div>
              <div style={{ fontSize: '12px', color: '#666' }}>Biometric Scanner #4 disconnected</div>
              <div style={{ fontSize: '10px', color: '#999', marginTop: '5px' }}>15 mins ago</div>
            </div>
            <div style={{ padding: '10px', borderBottom: '1px solid #eee' }}>
              <div style={{ fontWeight: 'bold' }}>Policy Updated</div>
              <div style={{ fontSize: '12px', color: '#666' }}>Late arrival tolerance changed</div>
              <div style={{ fontSize: '10px', color: '#999', marginTop: '5px' }}>1 hour ago</div>
            </div>
          </div>
          <button className="btn" style={{ width: '100%', marginTop: '15px', border: '1px solid #ddd' }} onClick={() => navigate('/admin/audit-logs')}>View All Logs</button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;