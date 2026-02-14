import React, { useState } from 'react';
import DataTable from '../common/DataTable';
import Card from '../common/Card';
import { FiActivity, FiSearch, FiFilter, FiDownload } from 'react-icons/fi';

const AuditLogs = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const logs = [
    { id: 1, action: 'User Login', user: 'admin@hu.edu.et', role: 'Admin', ip: '192.168.1.10', time: '2025-02-20 08:00:05', status: 'Success' },
    { id: 2, action: 'Create User', user: 'admin@hu.edu.et', role: 'Admin', ip: '192.168.1.10', time: '2025-02-20 09:15:22', status: 'Success' },
    { id: 3, action: 'Update Policy', user: 'admin@hu.edu.et', role: 'Admin', ip: '192.168.1.10', time: '2025-02-20 10:30:00', status: 'Success' },
    { id: 4, action: 'Failed Login', user: 'unknown', role: '-', ip: '45.22.11.1', time: '2025-02-20 11:05:10', status: 'Failed' },
    { id: 5, action: 'Delete Role', user: 'admin@hu.edu.et', role: 'Admin', ip: '192.168.1.10', time: '2025-02-20 14:20:15', status: 'Success' },
    { id: 6, action: 'Device Sync', user: 'System', role: 'System', ip: 'Localhost', time: '2025-02-20 15:00:00', status: 'Success' },
  ];

  const filteredLogs = logs.filter(log => 
    log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
    log.user.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const columns = [
    { 
      header: 'Action', 
      accessor: 'action',
      render: (row) => (
          <div style={{ fontWeight: 600 }}>{row.action}</div>
      )
    },
    { 
        header: 'User', 
        accessor: 'user',
        render: (row) => (
            <div>
                <div>{row.user}</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{row.role}</div>
            </div>
        )
    },
    { header: 'IP Address', accessor: 'ip' },
    { header: 'Timestamp', accessor: 'time' },
    { 
      header: 'Status', 
      accessor: 'status',
      render: (row) => (
        <span style={{ 
            color: row.status === 'Success' ? 'var(--success-color)' : 'var(--danger-color)',
            fontWeight: 500
        }}>
          {row.status}
        </span>
      )
    }
  ];

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <h2 style={{ margin: 0, fontWeight: 700, fontSize: '1.5rem' }}>Audit Logs</h2>
          <p style={{ margin: '4px 0 0', color: 'var(--text-secondary)' }}>Track system activities and security events.</p>
        </div>
        <button className="btn btn-outline">
            <FiDownload /> Export Logs
        </button>
      </div>

      <Card className="mb-4">
        <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap', alignItems: 'center' }}>
            <div style={{ flex: 1, minWidth: '200px', position: 'relative' }}>
                <FiSearch style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
                <input 
                    type="text" 
                    className="form-control" 
                    placeholder="Search by action or user..." 
                    style={{ paddingLeft: '35px' }}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            <div style={{ width: '200px' }}>
                <select className="form-control">
                    <option value="">All Actions</option>
                    <option value="Login">Login</option>
                    <option value="Create">Create</option>
                    <option value="Delete">Delete</option>
                </select>
            </div>
            <button className="btn btn-primary">
                <FiFilter /> Filter
            </button>
        </div>
      </Card>

      <DataTable 
        title="Activity Log" 
        columns={columns} 
        data={filteredLogs} 
        pagination={true}
        itemsPerPage={10}
      />
    </div>
  );
};

export default AuditLogs;