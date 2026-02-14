import React, { useState } from 'react';
import { FiEdit2, FiTrash2, FiUserPlus } from 'react-icons/fi';
import toast, { Toaster } from 'react-hot-toast';
import { FiSearch } from 'react-icons/fi';
import Modal from '../common/Modal';

const EmployeeManagement = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [employees, setEmployees] = useState([
    { id: 1, name: 'John Doe', email: 'john@hu.edu.et', department: 'CS', position: 'Lecturer', status: 'Active' },
    { id: 2, name: 'Jane Smith', email: 'jane@hu.edu.et', department: 'IT', position: 'Professor', status: 'Active' },
    { id: 3, name: 'Bob Johnson', email: 'bob@hu.edu.et', department: 'Engineering', position: 'Assistant', status: 'Inactive' },
  ]);

  const [newEmployee, setNewEmployee] = useState({
    name: '',
    email: '',
    department: '',
    position: '',
  });

  const handleAddEmployee = () => {
    toast.loading('Adding employee...', { id: 'add' });
    
    setTimeout(() => {
      const newId = employees.length + 1;
      setEmployees([...employees, { ...newEmployee, id: newId, status: 'Active' }]);
      toast.success('Employee added successfully!', { id: 'add' });
      setShowAddModal(false);
      setNewEmployee({ name: '', email: '', department: '', position: '' });
    }, 1500);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      toast.loading('Deleting employee...', { id: 'delete' });
      
      setTimeout(() => {
        setEmployees(employees.filter(emp => emp.id !== id));
        toast.success('Employee deleted successfully!', { id: 'delete' });
      }, 1000);
    }
  };

  return (
    <div>
      <Toaster position="top-right" />
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h1>Employee Management</h1>
        <button className="btn btn-primary" onClick={() => setShowAddModal(true)}>
          <FiUserPlus /> Add Employee
        </button>
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Department</th>
              <th>Position</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map(emp => (
              <tr key={emp.id}>
                <td>{emp.id}</td>
                <td>{emp.name}</td>
                <td>{emp.email}</td>
                <td>{emp.department}</td>
                <td>{emp.position}</td>
                <td>
                  <span className={`badge badge-${emp.status === 'Active' ? 'success' : 'danger'}`}>
                    {emp.status}
                  </span>
                </td>
                <td>
                  <button className="btn" style={{ marginRight: '5px', padding: '5px 10px' }}>
                    <FiEdit2 />
                  </button>
                  <button className="btn btn-danger" style={{ padding: '5px 10px' }} onClick={() => handleDelete(emp.id)}>
                    <FiTrash2 />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Employee Modal */}
      <Modal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        title="Add New Employee"
        footer={
          <>
            <button className="btn btn-outline" onClick={() => setShowAddModal(false)}>Cancel</button>
            <button className="btn btn-primary" onClick={handleAddEmployee}>Add Employee</button>
          </>
        }
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div className="form-group">
            <label>Full Name</label>
            <input
              type="text"
              className="form-control"
              value={newEmployee.name}
              onChange={(e) => setNewEmployee({ ...newEmployee, name: e.target.value })}
              placeholder="e.g. John Doe"
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              className="form-control"
              value={newEmployee.email}
              onChange={(e) => setNewEmployee({ ...newEmployee, email: e.target.value })}
              placeholder="e.g. john@hu.edu.et"
            />
          </div>

          <div className="form-group">
            <label>Department</label>
            <select
              className="form-control"
              value={newEmployee.department}
              onChange={(e) => setNewEmployee({ ...newEmployee, department: e.target.value })}
            >
              <option value="">Select Department</option>
              <option value="CS">Computer Science</option>
              <option value="IT">Information Technology</option>
              <option value="Engineering">Engineering</option>
              <option value="Business">Business</option>
            </select>
          </div>

          <div className="form-group">
            <label>Position</label>
            <input
              type="text"
              className="form-control"
              value={newEmployee.position}
              onChange={(e) => setNewEmployee({ ...newEmployee, position: e.target.value })}
              placeholder="e.g. Lecturer"
            />
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default EmployeeManagement;