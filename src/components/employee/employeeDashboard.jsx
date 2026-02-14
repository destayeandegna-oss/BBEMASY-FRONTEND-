import React from 'react';
import { FiClock, FiCalendar, FiCheckCircle, FiXCircle } from 'react-icons/fi';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useQuery } from 'react-query';
import { getEmployeeAttendance, getEmployeeStats } from '../../services/api';

const EmployeeDashboard = () => {
  const { data: attendance } = useQuery('employee-attendance', getEmployeeAttendance);
  const { data: stats } = useQuery('employee-stats', getEmployeeStats);

  const weeklyData = [
    { day: 'Mon', hours: 8 },
    { day: 'Tue', hours: 7.5 },
    { day: 'Wed', hours: 8 },
    { day: 'Thu', hours: 8 },
    { day: 'Fri', hours: 6 },
    { day: 'Sat', hours: 0 },
    { day: 'Sun', hours: 0 },
  ];

  return (
    <div>
      <h1>Employee Dashboard</h1>
      <p>Welcome back, John Doe!</p>

      <div className="dashboard-cards">
        <div className="stat-card">
          <div className="stat-card-info">
            <h3>Today's Status</h3>
            <h2>Checked In</h2>
            <span style={{ color: '#28a745' }}>08:45 AM</span>
          </div>
          <div className="stat-card-icon" style={{ background: '#e3f2fd' }}>
            <FiClock color="#1a237e" />
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-card-info">
            <h3>Working Hours</h3>
            <h2>37.5 hrs</h2>
            <span>This week</span>
          </div>
          <div className="stat-card-icon" style={{ background: '#e8f5e8' }}>
            <FiCalendar color="#28a745" />
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-card-info">
            <h3>Present Days</h3>
            <h2>18</h2>
            <span>This month</span>
          </div>
          <div className="stat-card-icon" style={{ background: '#fff3e0' }}>
            <FiCheckCircle color="#ff9800" />
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-card-info">
            <h3>Absent Days</h3>
            <h2>2</h2>
            <span>This month</span>
          </div>
          <div className="stat-card-icon" style={{ background: '#ffebee' }}>
            <FiXCircle color="#dc3545" />
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px' }}>
        <div className="table-container">
          <h3>Weekly Attendance</h3>
          <div style={{ height: '300px', marginTop: '20px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="hours" stroke="#1a237e" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="table-container">
          <h3>Recent Attendance</h3>
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Check In</th>
                <th>Check Out</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>2025-02-10</td>
                <td>08:30 AM</td>
                <td>05:00 PM</td>
                <td><span className="badge badge-success">Present</span></td>
              </tr>
              <tr>
                <td>2025-02-09</td>
                <td>08:45 AM</td>
                <td>05:15 PM</td>
                <td><span className="badge badge-success">Present</span></td>
              </tr>
              <tr>
                <td>2025-02-08</td>
                <td>09:30 AM</td>
                <td>05:00 PM</td>
                <td><span className="badge badge-warning">Late</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDashboard;