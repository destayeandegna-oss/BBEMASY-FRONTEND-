import React, { useState } from 'react';
import DataTable from '../common/DataTable';
import Card from '../common/Card';
import Modal from '../common/Modal';
import { FiShield, FiPlus, FiEdit2, FiTrash2 } from 'react-icons/fi';
import toast from 'react-hot-toast';

const Roles = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [roles, setRoles] = useState([
    { id: 1, name: 'System Admin', permissions: 'All Access', users: 2, status: 'Active' },
    { id: 2, name: 'HR Manager', permissions: 'Manage Users, Approve Leaves, View Reports', users: 5, status: 'Active' },
    { id: 3, name: 'Department Head', permissions: 'Approve Leaves, View Department Reports', users: 12, status: 'Active' },
    { id: 4, name: 'Employee', permissions: 'View Profile, Request Leave', users: 120, status: 'Active' },
  ]);

  const [newRole, setNewRole] = useState({ name: '', permissions: '' });

  const handleAddRole = () => {
    if (!newRole.name) {
        toast.error("Role name is required");
        return;
    }
    const role = {
      id: roles.length + 1,
      ...newRole,
      users: 0,
      status: 'Active'
    };
    setRoles([...roles, role]);
    setIsModalOpen(false);
    setNewRole({ name: '', permissions: '' });
    toast.success("Role created successfully");
  };

  const handleDelete = (id) => {
      if(window.confirm("Are you sure you want to delete this role? This might affect users assigned to this role.")) {
          setRoles(roles.filter(r => r.id !== id));
          toast.success("Role deleted");
      }
  };

  const columns = [
    { 
      header: 'Role Name', 
      accessor: 'name',
      render: (row) => (
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ padding: '8px', borderRadius: '50%', background: '#e0e7ff', color: '#4361ee' }}>
                  <FiShield />
              </div>
              <span style={{ fontWeight: 600 }}>{row.name}</span>
          </div>
      )
    },
    { header: 'Permissions', accessor: 'permissions', width: '40%' },
    { header: 'Assigned Users', accessor: 'users' },
    { 
      header: 'Status', 
      accessor: 'status',
      render: (row) => (
        <span style={{ color: 'var(--success-color)', fontWeight: 500 }}>{row.status}</span>
      )
    },
    { 
      header: 'Actions', 
      align: 'right', 
      render: (row) => (
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
          <button className="btn btn-outline btn-sm" title="Edit"><FiEdit2 /></button>
          <button className="btn btn-outline btn-sm" style={{ color: 'var(--danger-color)', borderColor: 'rgba(239, 71, 111, 0.3)' }} onClick={() => handleDelete(row.id)} title="Delete"><FiTrash2 /></button>
        </div>
      )
    }
  ];

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <h2 style={{ margin: 0, fontWeight: 700, fontSize: '1.5rem' }}>Roles & Permissions</h2>
          <p style={{ margin: '4px 0 0', color: 'var(--text-secondary)' }}>Manage access levels and user capabilities.</p>
        </div>
        <button className="btn btn-primary" onClick={() => setIsModalOpen(true)}>
          <FiPlus style={{ marginRight: '5px' }} /> Create Role
        </button>
      </div>

      <DataTable 
        title="System Roles" 
        columns={columns} 
        data={roles} 
        pagination={true}
        itemsPerPage={10}
      />

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Create New Role"
        footer={
          <>
            <button className="btn btn-outline" onClick={() => setIsModalOpen(false)}>Cancel</button>
            <button className="btn btn-primary" onClick={handleAddRole}>Create Role</button>
          </>
        }
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <label className="form-label" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Role Name</label>
            <input 
                type="text" 
                className="form-control" 
                value={newRole.name} 
                onChange={(e) => setNewRole({...newRole, name: e.target.value})} 
                placeholder="e.g. Supervisor" 
            />
          </div>
          <div>
            <label className="form-label" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Permissions</label>
            <textarea 
                className="form-control" 
                rows="3"
                value={newRole.permissions} 
                onChange={(e) => setNewRole({...newRole, permissions: e.target.value})} 
                placeholder="e.g. Approve Leaves, View Reports (comma separated)" 
            />
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Roles;