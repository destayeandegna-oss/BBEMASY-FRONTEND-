import React, { useState } from 'react';
import DataTable from '../common/DataTable';
import Card from '../common/Card';
import Modal from '../common/Modal';
import { FiGitMerge, FiPlus, FiEdit2, FiTrash2, FiCheckCircle } from 'react-icons/fi';
import toast from 'react-hot-toast';

const Workflows = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [workflows, setWorkflows] = useState([
    { id: 1, name: 'Standard Leave Approval', trigger: 'Leave Request', steps: 'Manager -> HR', status: 'Active' },
    { id: 2, name: 'Emergency Leave', trigger: 'Emergency Request', steps: 'HR (Immediate)', status: 'Active' },
    { id: 3, name: 'Overtime Request', trigger: 'Overtime Submission', steps: 'Supervisor -> Manager', status: 'Inactive' },
  ]);

  const [newWorkflow, setNewWorkflow] = useState({ name: '', trigger: '', steps: '' });

  const handleAddWorkflow = () => {
    if (!newWorkflow.name) return;
    const workflow = {
      id: workflows.length + 1,
      ...newWorkflow,
      status: 'Active'
    };
    setWorkflows([...workflows, workflow]);
    setIsModalOpen(false);
    setNewWorkflow({ name: '', trigger: '', steps: '' });
    toast.success("Workflow added");
  };

  const columns = [
    { 
      header: 'Workflow Name', 
      accessor: 'name',
      render: (row) => (
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ padding: '8px', borderRadius: '50%', background: '#f3e5f5', color: '#7b1fa2' }}>
                  <FiGitMerge />
              </div>
              <span style={{ fontWeight: 600 }}>{row.name}</span>
          </div>
      )
    },
    { header: 'Trigger Event', accessor: 'trigger' },
    { header: 'Approval Steps', accessor: 'steps' },
    { 
      header: 'Status', 
      accessor: 'status',
      render: (row) => (
        <span style={{ 
            display: 'inline-flex', alignItems: 'center', gap: '5px',
            color: row.status === 'Active' ? 'var(--success-color)' : 'var(--text-secondary)', 
            fontWeight: 500 
        }}>
          {row.status === 'Active' && <FiCheckCircle />} {row.status}
        </span>
      )
    },
    { 
      header: 'Actions', 
      align: 'right', 
      render: (row) => (
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
          <button className="btn btn-outline btn-sm"><FiEdit2 /></button>
          <button className="btn btn-outline btn-sm" style={{ color: 'var(--danger-color)' }}><FiTrash2 /></button>
        </div>
      )
    }
  ];

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <h2 style={{ margin: 0, fontWeight: 700, fontSize: '1.5rem' }}>Workflows</h2>
          <p style={{ margin: '4px 0 0', color: 'var(--text-secondary)' }}>Configure approval chains and automation.</p>
        </div>
        <button className="btn btn-primary" onClick={() => setIsModalOpen(true)}>
          <FiPlus style={{ marginRight: '5px' }} /> Add Workflow
        </button>
      </div>

      <DataTable 
        title="Approval Workflows" 
        columns={columns} 
        data={workflows} 
      />

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Add Workflow"
        footer={
          <>
            <button className="btn btn-outline" onClick={() => setIsModalOpen(false)}>Cancel</button>
            <button className="btn btn-primary" onClick={handleAddWorkflow}>Save</button>
          </>
        }
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <label className="form-label" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Workflow Name</label>
            <input type="text" className="form-control" value={newWorkflow.name} onChange={(e) => setNewWorkflow({...newWorkflow, name: e.target.value})} />
          </div>
          <div>
            <label className="form-label" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Trigger</label>
            <select className="form-control" value={newWorkflow.trigger} onChange={(e) => setNewWorkflow({...newWorkflow, trigger: e.target.value})}>
                <option value="">Select Trigger</option>
                <option value="Leave Request">Leave Request</option>
                <option value="Overtime">Overtime</option>
                <option value="Profile Update">Profile Update</option>
            </select>
          </div>
          <div>
            <label className="form-label" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Steps (Description)</label>
            <input type="text" className="form-control" value={newWorkflow.steps} onChange={(e) => setNewWorkflow({...newWorkflow, steps: e.target.value})} placeholder="e.g. Manager -> HR" />
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Workflows;