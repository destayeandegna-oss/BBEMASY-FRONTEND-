import React, { useState } from 'react';
import { FiCamera, FiCheck } from 'react-icons/fi';
import { MdFingerprint } from 'react-icons/md';
import toast, { Toaster } from 'react-hot-toast';

const BiometricEnrollment = () => {
  const [selectedEmployee, setSelectedEmployee] = useState('');
  const [method, setMethod] = useState('fingerprint');
  const [enrolling, setEnrolling] = useState(false);
  const [enrolled, setEnrolled] = useState(false);

  const employees = [
    { id: 1, name: 'John Doe', department: 'CS', enrolled: false },
    { id: 2, name: 'Jane Smith', department: 'IT', enrolled: true },
    { id: 3, name: 'Bob Johnson', department: 'Engineering', enrolled: false },
  ];

  const handleEnroll = () => {
    if (!selectedEmployee) {
      toast.error('Please select an employee');
      return;
    }

    setEnrolling(true);
    toast.loading('Enrolling biometric data...', { id: 'enroll' });

    setTimeout(() => {
      setEnrolled(true);
      toast.success('Biometric enrollment successful!', { id: 'enroll' });
      setEnrolling(false);
    }, 3000);
  };

  return (
    <div>
      <Toaster position="top-right" />
      <h1>Biometric Enrollment</h1>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '30px' }}>
        <div className="form-container" style={{ maxWidth: '100%' }}>
          <h2 style={{ marginBottom: '20px' }}>Enroll New Employee</h2>
          
          <div className="form-group">
            <label>Select Employee</label>
            <select
              className="form-control"
              value={selectedEmployee}
              onChange={(e) => {
                setSelectedEmployee(e.target.value);
                setEnrolled(false);
              }}
            >
              <option value="">Choose an employee</option>
              {employees.filter(emp => !emp.enrolled).map(emp => (
                <option key={emp.id} value={emp.id}>{emp.name} - {emp.department}</option>
              ))}
            </select>
          </div>

          <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
            <button
              className={`btn ${method === 'fingerprint' ? 'btn-primary' : ''}`}
              style={{ flex: 1 }}
              onClick={() => setMethod('fingerprint')}
            >
              <MdFingerprint /> Fingerprint
            </button>
            <button
              className={`btn ${method === 'face' ? 'btn-primary' : ''}`}
              style={{ flex: 1 }}
              onClick={() => setMethod('face')}
            >
              <FiCamera /> Face ID
            </button>
          </div>

          <div style={{ 
            border: '2px dashed #ccc', 
            borderRadius: '10px', 
            padding: '40px',
            textAlign: 'center',
            marginBottom: '20px',
            background: enrolled ? '#e8f5e8' : 'white'
          }}>
            {enrolled ? (
              <>
                <FiCheck size={80} color="#28a745" />
                <p style={{ marginTop: '10px', color: '#28a745' }}>Enrollment Complete!</p>
              </>
            ) : (
              <>
                {method === 'fingerprint' ? (
                  <MdFingerprint size={80} color="#1a237e" />
                ) : (
                  <FiCamera size={80} color="#1a237e" />
                )}
                <p style={{ marginTop: '10px', color: '#666' }}>
                  {enrolling 
                    ? 'Scanning... Please wait' 
                    : `Place employee's ${method === 'fingerprint' ? 'finger' : 'face'} for enrollment`}
                </p>
              </>
            )}
          </div>

          <button
            className="btn btn-primary"
            style={{ width: '100%' }}
            onClick={handleEnroll}
            disabled={!selectedEmployee || enrolling || enrolled}
          >
            {enrolling ? 'Enrolling...' : enrolled ? 'Enrolled' : 'Start Enrollment'}
          </button>
        </div>

        <div className="table-container">
          <h3>Enrollment Status</h3>
          <table>
            <thead>
              <tr>
                <th>Employee</th>
                <th>Department</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {employees.map(emp => (
                <tr key={emp.id}>
                  <td>{emp.name}</td>
                  <td>{emp.department}</td>
                  <td>
                    <span className={`badge badge-${emp.enrolled ? 'success' : 'warning'}`}>
                      {emp.enrolled ? 'Enrolled' : 'Pending'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default BiometricEnrollment;