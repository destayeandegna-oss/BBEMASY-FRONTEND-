import React, { useState } from 'react';
import { FiCalendar, FiDownload } from 'react-icons/fi';

const AttendanceView = () => {
  const [dateRange, setDateRange] = useState({
    startDate: '',
    endDate: '',
  });

  const attendanceData = [
    { date: '2025-02-10', checkIn: '08:30 AM', checkOut: '05:00 PM', hours: '8.5', status: 'Present', overtime: '0' },
    { date: '2025-02-09', checkIn: '08:45 AM', checkOut: '05:15 PM', hours: '8.5', status: 'Present', overtime: '0.25' },
    { date: '2025-02-08', checkIn: '09:15 AM', checkOut: '05:30 PM', hours: '8.25', status: 'Late', overtime: '0.5' },
    { date: '2025-02-07', checkIn: '08:30 AM', checkOut: '04:30 PM', hours: '8.0', status: 'Early Exit', overtime: '0' },
    { date: '2025-02-06', checkIn: '08:30 AM', checkOut: '05:00 PM', hours: '8.5', status: 'Present', overtime: '0' },
    { date: '2025-02-05', checkIn: '08:30 AM', checkOut: '06:00 PM', hours: '9.5', status: 'Present', overtime: '1.0' },
  ];

  const summary = {
    totalDays: 22,
    presentDays: 18,
    absentDays: 2,
    lateDays: 2,
    totalHours: 176.5,
    overtimeHours: 12.5,
  };

  return (
    <div>
      <h1>My Attendance</h1>
      
      {/* Summary Cards */}
      <div className="dashboard-cards">
        <div className="stat-card">
          <div className="stat-card-info">
            <h3>Present Days</h3>
            <h2>{summary.presentDays}</h2>
            <span>This month</span>
          </div>
          <div className="stat-card-icon" style={{ background: '#e8f5e8' }}>
            <FiCalendar color="#28a745" />
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-card-info">
            <h3>Absent Days</h3>
            <h2>{summary.absentDays}</h2>
            <span>This month</span>
          </div>
          <div className="stat-card-icon" style={{ background: '#ffebee' }}>
            <FiCalendar color="#dc3545" />
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-card-info">
            <h3>Total Hours</h3>
            <h2>{summary.totalHours}</h2>
            <span>This month</span>
          </div>
          <div className="stat-card-icon" style={{ background: '#e3f2fd' }}>
            <FiCalendar color="#1a237e" />
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-card-info">
            <h3>Overtime</h3>
            <h2>{summary.overtimeHours}</h2>
            <span>This month</span>
          </div>
          <div className="stat-card-icon" style={{ background: '#fff3e0' }}>
            <FiCalendar color="#ff9800" />
          </div>
        </div>
      </div>

      {/* Filter Section */}
      <div className="table-container" style={{ marginBottom: '20px' }}>
        <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-end' }}>
          <div className="form-group" style={{ flex: 1 }}>
            <label>Start Date</label>
            <input
              type="date"
              className="form-control"
              value={dateRange.startDate}
              onChange={(e) => setDateRange({ ...dateRange, startDate: e.target.value })}
            />
          </div>
          <div className="form-group" style={{ flex: 1 }}>
            <label>End Date</label>
            <input
              type="date"
              className="form-control"
              value={dateRange.endDate}
              onChange={(e) => setDateRange({ ...dateRange, endDate: e.target.value })}
            />
          </div>
          <button className="btn btn-primary" style={{ height: '40px' }}>
            Filter
          </button>
          <button className="btn" style={{ height: '40px' }}>
            <FiDownload /> Export
          </button>
        </div>
      </div>

      {/* Attendance Table */}
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Check In</th>
              <th>Check Out</th>
              <th>Total Hours</th>
              <th>Status</th>
              <th>Overtime</th>
            </tr>
          </thead>
          <tbody>
            {attendanceData.map((record, index) => (
              <tr key={index}>
                <td>{record.date}</td>
                <td>{record.checkIn}</td>
                <td>{record.checkOut}</td>
                <td>{record.hours} hrs</td>
                <td>
                  <span className={`badge badge-${
                    record.status === 'Present' ? 'success' : 
                    record.status === 'Late' ? 'warning' : 
                    'danger'
                  }`}>
                    {record.status}
                  </span>
                </td>
                <td>{record.overtime} hrs</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '20px' }}>
          <span>Showing 1-6 of 22 entries</span>
          <div style={{ display: 'flex', gap: '5px' }}>
            <button className="btn" disabled>Previous</button>
            <button className="btn btn-primary">1</button>
            <button className="btn">2</button>
            <button className="btn">3</button>
            <button className="btn">4</button>
            <button className="btn">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttendanceView;