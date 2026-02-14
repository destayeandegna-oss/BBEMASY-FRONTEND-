import React, { useState } from 'react';
import DataTable from '../common/DataTable';
import Card from '../common/Card';
import Modal from '../common/Modal';
import { FiFileText, FiPlus, FiEdit2, FiTrash2 } from 'react-icons/fi';
import toast from 'react-hot-toast';

const Policies = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [policies, setPolicies] = useState([
    { id: 1, name: 'Late Arrival Tolerance', type: 'Attendance', value: '15 minutes', lastUpdated: '2024-01-10' },
    { id: 2, name: 'Annual Leave Quota', type: 'Leave', value: '20 days/year', lastUpdated: '2023-12-01' },
    { id: 3, name: 'Password Expiry', type: 'Security', value: '90 days', lastUpdated: '2024-02-15' },
    { id: 4, name: 'Work Hours', type: 'Attendance', value: '08:30 AM - 05:30 PM', lastUpdated: '2023-11-20' },
  ]);

  const [newPolicy, setNewPolicy] = useState({ name: '', type: 'Attendance', value: '' });

  const handleAddPolicy = () => {
    if (!newPolicy.name) return;
    const policy = {
      id: policies.length + 1,
      ...newPolicy,
      lastUpdated: new Date().toISOString().split('T')[0]
    };
    setPolicies([...policies, policy]);
    setIsModalOpen(false);
    setNewPolicy({ name: '', type: 'Attendance', value: '' });
    toast.success("Policy updated");
  };

  const columns = [
    { 
      header: 'Policy Name', 
      accessor: 'name',
      render: (row) => (
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ padding: '8px', borderRadius: '50%', background: '#e3f2fd', color: '#1565c0' }}>
                  <FiFileText />
              </div>
              <span style={{ fontWeight: 600 }}>{row.name}</span>
          </div>
      )
    },
    { header: 'Type', accessor: 'type' },
    { header: 'Value/Rule', accessor: 'value' },
    { header: 'Last Updated', accessor: 'lastUpdated' },
    { 
      header: 'Actions', 
      align: 'right', 
      render: (row) => (
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
          <button className="btn btn-outline btn-sm"><FiEdit2 /></button>
        </div>
      )
    }
  ];

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <h2 style={{ margin: 0, fontWeight: 700, fontSize: '1.5rem' }}>System Policies</h2>
          <p style={{ margin: '4px 0 0', color: 'var(--text-secondary)' }}>Configure global system rules and limits.</p>
        </div>
        <button className="btn btn-primary" onClick={() => setIsModalOpen(true)}>
          <FiPlus style={{ marginRight: '5px' }} /> Add Policy
        </button>
      </div>

      <DataTable 
        title="Active Policies" 
        columns={columns} 
        data={policies} 
      />

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Add/Edit Policy"
        footer={
          <>
            <button className="btn btn-outline" onClick={() => setIsModalOpen(false)}>Cancel</button>
            <button className="btn btn-primary" onClick={handleAddPolicy}>Save Policy</button>
          </>
        }
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <label className="form-label" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Policy Name</label>
            <input type="text" className="form-control" value={newPolicy.name} onChange={(e) => setNewPolicy({...newPolicy, name: e.target.value})} />
          </div>
          <div>
            <label className="form-label" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Type</label>
            <select className="form-control" value={newPolicy.type} onChange={(e) => setNewPolicy({...newPolicy, type: e.target.value})}>
                <option value="Attendance">Attendance</option>
                <option value="Leave">Leave</option>
                <option value="Security">Security</option>
                <option value="System">System</option>
            </select>
          </div>
          <div>
            <label className="form-label" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Value / Rule</label>
            <input type="text" className="form-control" value={newPolicy.value} onChange={(e) => setNewPolicy({...newPolicy, value: e.target.value})} placeholder="e.g. 15 minutes" />
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Policies;