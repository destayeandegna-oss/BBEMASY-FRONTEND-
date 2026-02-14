import React, { useState } from 'react';
import DataTable from '../common/DataTable';
import Card from '../common/Card';
import Modal from '../common/Modal';
import { UsersIcon } from '../DashboardLayout';

const UserManagement = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newUser, setNewUser] = useState({ name: '', email: '', role: 'Employee', department: '' });
  
  // Mock data
  const [users, setUsers] = useState([
    { id: 1, name: 'John Doe', email: 'john@hu.edu.et', role: 'Admin', status: 'Active', department: 'IT' },
    { id: 2, name: 'Jane Smith', email: 'jane@hu.edu.et', role: 'HR', status: 'Active', department: 'Human Resources' },
    { id: 3, name: 'Bob Johnson', email: 'bob@hu.edu.et', role: 'Employee', status: 'Inactive', department: 'Engineering' },
  ]);

  const handleAddUser = () => {
    const user = {
      id: users.length + 1,
      ...newUser,
      status: 'Active'
    };
    setUsers([...users, user]);
    setIsModalOpen(false);
    setNewUser({ name: '', email: '', role: 'Employee', department: '' });
  };

  const columns = [
    { 
      header: 'Name', 
      accessor: 'name', 
      render: (row) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ 
            width: '36px', height: '36px', borderRadius: '50%', 
            background: '#e0e7ff', color: '#4361ee', 
            display: 'flex', alignItems: 'center', justifyContent: 'center', 
            fontWeight: 'bold', fontSize: '14px' 
          }}>
            {row.name.charAt(0)}
          </div>
          <div>
            <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{row.name}</div>
            <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{row.email}</div>
          </div>
        </div>
      )
    },
    { 
      header: 'Role', 
      accessor: 'role', 
      render: (row) => (
        <span style={{ 
          padding: '4px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: 600,
          backgroundColor: row.role === 'Admin' ? 'rgba(67, 97, 238, 0.1)' : row.role === 'HR' ? 'rgba(239, 71, 111, 0.1)' : 'rgba(107, 114, 128, 0.1)',
          color: row.role === 'Admin' ? 'var(--primary-color)' : row.role === 'HR' ? 'var(--danger-color)' : 'var(--text-secondary)'
        }}>
          {row.role}
        </span>
      )
    },
    { header: 'Department', accessor: 'department' },
    { 
      header: 'Status', 
      accessor: 'status', 
      render: (row) => (
        <span style={{ color: row.status === 'Active' ? 'var(--success-color)' : 'var(--text-secondary)', fontWeight: 500 }}>
          {row.status}
        </span>
      )
    },
    { 
      header: 'Actions', 
      align: 'right', 
      render: () => (
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
          <button className="btn btn-outline btn-sm">Edit</button>
          <button className="btn btn-outline btn-sm" style={{ color: 'var(--danger-color)', borderColor: 'rgba(239, 71, 111, 0.3)' }}>Delete</button>
        </div>
      )
    }
  ];

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <h2 style={{ margin: 0, fontWeight: 700, fontSize: '1.5rem' }}>User Management</h2>
          <p style={{ margin: '4px 0 0', color: 'var(--text-secondary)' }}>Manage system users, roles, and permissions.</p>
        </div>
        <button className="btn btn-primary" onClick={() => setIsModalOpen(true)}>
          <span style={{ fontSize: '1.2rem', lineHeight: 1, marginRight: '4px' }}>+</span> Add User
        </button>
      </div>

      <div className="dashboard-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', marginBottom: '24px' }}>
        <Card title="Total Users"><h2 style={{ margin: 0, fontSize: '2.5rem', color: 'var(--primary-color)' }}>{users.length}</h2></Card>
        <Card title="Active Users"><h2 style={{ margin: 0, fontSize: '2.5rem', color: 'var(--success-color)' }}>{users.filter(u => u.status === 'Active').length}</h2></Card>
      </div>

      <DataTable 
        title="All Users" 
        columns={columns} 
        data={users} 
        pagination={true}
        itemsPerPage={5}
      />

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Add New User"
        footer={
          <>
            <button className="btn btn-outline" onClick={() => setIsModalOpen(false)}>Cancel</button>
            <button className="btn btn-primary" onClick={handleAddUser}>Save User</button>
          </>
        }
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500 }}>Full Name</label>
            <input type="text" className="form-control" value={newUser.name} onChange={(e) => setNewUser({...newUser, name: e.target.value})} placeholder="e.g. John Doe" />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500 }}>Email Address</label>
            <input type="email" className="form-control" value={newUser.email} onChange={(e) => setNewUser({...newUser, email: e.target.value})} placeholder="e.g. john@hu.edu.et" />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500 }}>Role</label>
              <select className="form-control" value={newUser.role} onChange={(e) => setNewUser({...newUser, role: e.target.value})}>
                <option value="Employee">Employee</option>
                <option value="HR">HR Manager</option>
                <option value="Admin">Admin</option>
              </select>
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500 }}>Department</label>
              <input type="text" className="form-control" value={newUser.department} onChange={(e) => setNewUser({...newUser, department: e.target.value})} placeholder="e.g. IT" />
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default UserManagement;