import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FiUsers, FiClock, FiCheckSquare, FiActivity } from 'react-icons/fi';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const StatCard = ({ icon: Icon, label, value, color, bg }) => (
  <div style={{ padding: '20px', background: 'white', borderRadius: '10px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', display: 'flex', alignItems: 'center', gap: '15px' }}>
    <div style={{ padding: '12px', borderRadius: '50%', background: bg, color: color, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Icon size={24} />
    </div>
    <div>
      <div style={{ fontSize: '14px', color: '#666', marginBottom: '4px' }}>{label}</div>
      <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#333' }}>{value}</div>
    </div>
  </div>
);

const DepartmentHeadDashboard = () => {
  const navigate = useNavigate();
  // Mock data
  const attendanceData = [
    { name: 'Mon', Present: 42, Late: 2, Absent: 1 },
    { name: 'Tue', Present: 44, Late: 1, Absent: 0 },
    { name: 'Wed', Present: 40, Late: 3, Absent: 2 },
    { name: 'Thu', Present: 43, Late: 2, Absent: 0 },
    { name: 'Fri', Present: 41, Late: 1, Absent: 3 },
  ];

  return (
    <div>
      <h1 style={{ marginBottom: '25px' }}>Department Overview</h1>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px', marginBottom: '30px' }}>
        <StatCard icon={FiUsers} label="Team Members" value="45" color="#1565c0" bg="#e3f2fd" />
        <StatCard icon={FiClock} label="Present Today" value="42" color="#2e7d32" bg="#e8f5e9" />
        <StatCard icon={FiCheckSquare} label="Pending Leaves" value="3" color="#f57f17" bg="#fff8e1" />
        <StatCard icon={FiActivity} label="Avg Attendance" value="96%" color="#6a1b9a" bg="#f3e5f5" />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px' }}>
        <div style={{ background: 'white', padding: '25px', borderRadius: '10px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', minHeight: '300px' }}>
          <h3 style={{ marginBottom: '20px' }}>Weekly Team Attendance</h3>
          <div style={{ height: '300px', width: '100%' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={attendanceData} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip cursor={{ fill: 'transparent' }} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                <Legend wrapperStyle={{ paddingTop: '20px' }} />
                <Bar dataKey="Present" fill="#4361ee" radius={[4, 4, 0, 0]} barSize={30} />
                <Bar dataKey="Late" fill="#ffd166" radius={[4, 4, 0, 0]} barSize={30} />
                <Bar dataKey="Absent" fill="#ef476f" radius={[4, 4, 0, 0]} barSize={30} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div style={{ background: 'white', padding: '25px', borderRadius: '10px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
          <h3 style={{ marginBottom: '20px' }}>Quick Actions</h3>
          <button className="btn btn-primary" style={{ width: '100%', marginBottom: '10px' }} onClick={() => navigate('/department-head/leaves')}>Review Leaves</button>
          <button className="btn" style={{ width: '100%', marginBottom: '10px', border: '1px solid #ddd' }} onClick={() => navigate('/department-head/attendance')}>View Attendance</button>
          <button className="btn" style={{ width: '100%', border: '1px solid #ddd' }} onClick={() => navigate('/department-head/team')}>Manage Team</button>
        </div>
      </div>
    </div>
  );
};

export default DepartmentHeadDashboard;