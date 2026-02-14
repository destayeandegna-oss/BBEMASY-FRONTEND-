import React, { useState } from 'react';
import { FiCalendar, FiClock, FiFilter, FiCheckCircle, FiAlertCircle, FiXCircle, FiSearch } from 'react-icons/fi';
import Card from '../common/Card';
import DataTable from '../common/DataTable';
import Modal from '../common/Modal';

const AttendanceManagement = () => {
  const [dateRange, setDateRange] = useState({
    start: new Date().toISOString().split('T')[0],
    end: new Date().toISOString().split('T')[0]
  });
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Mock Data
  const attendanceData = [
    { id: 1, employee: 'John Doe', department: 'CS', date: '2025-02-20', checkIn: '08:30 AM', checkOut: '05:30 PM', status: 'Present', workHours: '8h 0m' },
    { id: 2, employee: 'Jane Smith', department: 'IT', date: '2025-02-20', checkIn: '09:15 AM', checkOut: '05:45 PM', status: 'Late', workHours: '7h 30m' },
    { id: 3, employee: 'Bob Johnson', department: 'Engineering', date: '2025-02-20', checkIn: '-', checkOut: '-', status: 'Absent', workHours: '0h 0m' },
    { id: 4, employee: 'Alice Brown', department: 'Business', date: '2025-02-20', checkIn: '08:45 AM', checkOut: '05:15 PM', status: 'Present', workHours: '7h 30m' },
    { id: 5, employee: 'Charlie Wilson', department: 'Marketing', date: '2025-02-20', checkIn: '08:30 AM', checkOut: '01:00 PM', status: 'Half Day', workHours: '4h 30m' },
  ];

  const handleView = (record) => {
    setSelectedRecord(record);
    setIsModalOpen(true);
  };

  const columns = [
    { 
      header: 'Employee', 
      accessor: 'employee',
      render: (row) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#e0e7ff', color: '#4361ee', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '12px' }}>
            {row.employee.charAt(0)}
          </div>
          <div>
            <div style={{ fontWeight: 500 }}>{row.employee}</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{row.department}</div>
          </div>
        </div>
      )
    },
    { header: 'Check In', accessor: 'checkIn' },
    { header: 'Check Out', accessor: 'checkOut' },
    { header: 'Work Hours', accessor: 'workHours' },
    { 
      header: 'Status', 
      accessor: 'status',
      render: (row) => {
        let color = 'var(--text-secondary)';
        let bg = '#f3f4f6';
        let icon = null;

        if (row.status === 'Present') {
          color = 'var(--success-color)';
          bg = 'rgba(6, 214, 160, 0.1)';
          icon = <FiCheckCircle />;
        } else if (row.status === 'Late') {
          color = 'var(--warning-color)';
          bg = 'rgba(255, 209, 102, 0.1)';
          icon = <FiAlertCircle />;
        } else if (row.status === 'Absent') {
          color = 'var(--danger-color)';
          bg = 'rgba(239, 71, 111, 0.1)';
          icon = <FiXCircle />;
        }

        return (
          <span style={{ 
            display: 'inline-flex', 
            alignItems: 'center', 
            gap: '5px', 
            padding: '4px 10px', 
            borderRadius: '20px', 
            fontSize: '0.75rem', 
            fontWeight: 600, 
            color, 
            backgroundColor: bg 
          }}>
            {icon} {row.status}
          </span>
        );
      }
    },
    {
      header: 'Actions',
      align: 'right',
      render: (row) => (
        <button className="btn btn-outline btn-sm" onClick={() => handleView(row)}>
          Details
        </button>
      )
    }
  ];

  const filteredData = attendanceData.filter(record =>
    record.employee.toLowerCase().includes(searchTerm.toLowerCase()) ||
    record.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <h2 style={{ margin: 0, fontWeight: 700, fontSize: '1.5rem' }}>Attendance Management</h2>
          <p style={{ margin: '4px 0 0', color: 'var(--text-secondary)' }}>Monitor daily employee attendance.</p>
        </div>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
           <div style={{ position: 'relative' }}>
             <FiSearch style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
             <input
               type="text"
               className="form-control"
               placeholder="Search employee..."
               value={searchTerm}
               onChange={(e) => setSearchTerm(e.target.value)}
               style={{ paddingLeft: '35px', width: '200px' }}
             />
           </div>
           <input 
             type="date" 
             className="form-control" 
             value={dateRange.start} 
             onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
             style={{ width: 'auto' }}
           />
           <span style={{ color: 'var(--text-secondary)' }}>to</span>
           <input 
             type="date" 
             className="form-control" 
             value={dateRange.end} 
             onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
             style={{ width: 'auto' }}
           />
           <button className="btn btn-primary"><FiFilter /> Filter</button>
        </div>
      </div>

      <div className="dashboard-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', marginBottom: '24px' }}>
        <Card title="Present">
            <h2 style={{ margin: 0, fontSize: '2.5rem', color: 'var(--success-color)' }}>
                {attendanceData.filter(r => r.status === 'Present').length}
            </h2>
        </Card>
        <Card title="Late">
            <h2 style={{ margin: 0, fontSize: '2.5rem', color: 'var(--warning-color)' }}>
                {attendanceData.filter(r => r.status === 'Late').length}
            </h2>
        </Card>
        <Card title="Absent">
            <h2 style={{ margin: 0, fontSize: '2.5rem', color: 'var(--danger-color)' }}>
                {attendanceData.filter(r => r.status === 'Absent').length}
            </h2>
        </Card>
        <Card title="On Leave">
            <h2 style={{ margin: 0, fontSize: '2.5rem', color: 'var(--primary-color)' }}>2</h2>
        </Card>
      </div>

      <DataTable 
        title={`Attendance Records (${dateRange.start} - ${dateRange.end})`}
        columns={columns} 
        data={filteredData} 
        pagination={true}
        itemsPerPage={10}
      />

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Attendance Details"
        footer={<button className="btn btn-primary" onClick={() => setIsModalOpen(false)}>Close</button>}
      >
        {selectedRecord && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px', paddingBottom: '15px', borderBottom: '1px solid var(--bg-body)' }}>
                    <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: '#e0e7ff', color: 'var(--primary-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', fontWeight: 'bold' }}>
                        {selectedRecord.employee.charAt(0)}
                    </div>
                    <div>
                        <h3 style={{ margin: 0, fontSize: '1.2rem' }}>{selectedRecord.employee}</h3>
                        <span style={{ color: 'var(--text-secondary)' }}>{selectedRecord.department}</span>
                    </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                    <div>
                        <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '4px' }}>Date</label>
                        <div style={{ fontWeight: 500, display: 'flex', alignItems: 'center', gap: '5px' }}><FiCalendar /> {selectedRecord.date}</div>
                    </div>
                    <div>
                        <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '4px' }}>Status</label>
                        <div style={{ fontWeight: 500 }}>{selectedRecord.status}</div>
                    </div>
                    <div>
                        <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '4px' }}>Check In</label>
                        <div style={{ fontWeight: 500, display: 'flex', alignItems: 'center', gap: '5px', color: 'var(--success-color)' }}><FiClock /> {selectedRecord.checkIn}</div>
                    </div>
                    <div>
                        <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '4px' }}>Check Out</label>
                        <div style={{ fontWeight: 500, display: 'flex', alignItems: 'center', gap: '5px', color: 'var(--danger-color)' }}><FiClock /> {selectedRecord.checkOut}</div>
                    </div>
                    <div>
                        <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '4px' }}>Total Work Hours</label>
                        <div style={{ fontWeight: 500 }}>{selectedRecord.workHours}</div>
                    </div>
                </div>
            </div>
        )}
      </Modal>
    </div>
  );
};

export default AttendanceManagement;