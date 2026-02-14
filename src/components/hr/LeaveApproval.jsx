import React, { useState } from 'react';
import { FiCheck, FiX, FiEye, FiFilter, FiCalendar, FiClock, FiSearch } from 'react-icons/fi';
import toast, { Toaster } from 'react-hot-toast';
import Card from '../common/Card';
import DataTable from '../common/DataTable';
import Modal from '../common/Modal';

const LeaveApproval = () => {
  const [leaveRequests, setLeaveRequests] = useState([
    { 
      id: 1, 
      employee: 'John Doe', 
      dept: 'Computer Science',
      type: 'Annual Leave',
      startDate: '2025-03-01',
      endDate: '2025-03-05',
      days: 5,
      reason: 'Family vacation to Hawassa. Need to attend my sister\'s wedding.',
      status: 'Pending',
      appliedOn: '2025-02-15',
      balance: 15
    },
    { 
      id: 2, 
      employee: 'Jane Smith', 
      dept: 'Information Technology',
      type: 'Sick Leave',
      startDate: '2025-02-20',
      endDate: '2025-02-22',
      days: 3,
      reason: 'Medical appointment and recovery',
      status: 'Pending',
      appliedOn: '2025-02-16',
      balance: 10
    },
    { 
      id: 3, 
      employee: 'Bob Johnson', 
      dept: 'Engineering',
      type: 'Emergency Leave',
      startDate: '2025-02-18',
      endDate: '2025-02-19',
      days: 2,
      reason: 'Family emergency',
      status: 'Approved',
      appliedOn: '2025-02-17',
      approvedBy: 'HR Officer',
      balance: 5
    },
  ]);

  const [selectedRequest, setSelectedRequest] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const handleApprove = (id) => {
    toast.loading('Processing approval...', { id: 'approve' });
    setTimeout(() => {
      setLeaveRequests(leaveRequests.map(req => 
        req.id === id ? { ...req, status: 'Approved', approvedBy: 'HR Officer' } : req
      ));
      toast.success('Leave request approved!', { id: 'approve' });
      if (selectedRequest && selectedRequest.id === id) {
          setIsModalOpen(false);
      }
    }, 1000);
  };

  const handleReject = (id) => {
    toast.loading('Processing rejection...', { id: 'reject' });
    setTimeout(() => {
      setLeaveRequests(leaveRequests.map(req => 
        req.id === id ? { ...req, status: 'Rejected' } : req
      ));
      toast.success('Leave request rejected', { id: 'reject' });
      if (selectedRequest && selectedRequest.id === id) {
          setIsModalOpen(false);
      }
    }, 1000);
  };

  const handleView = (request) => {
      setSelectedRequest(request);
      setIsModalOpen(true);
  };

  const columns = [
    { header: 'Employee', accessor: 'employee', render: (row) => (
        <div>
            <div style={{ fontWeight: 600 }}>{row.employee}</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{row.dept}</div>
        </div>
    )},
    { header: 'Type', accessor: 'type' },
    { header: 'Duration', accessor: 'startDate', render: (row) => (
        <div>
            <div>{row.startDate} to {row.endDate}</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{row.days} days</div>
        </div>
    )},
    { header: 'Applied On', accessor: 'appliedOn' },
    { header: 'Status', accessor: 'status', render: (row) => (
        <span style={{ 
            padding: '4px 8px', 
            borderRadius: '12px',
            fontSize: '0.75rem',
            backgroundColor: row.status === 'Pending' ? 'rgba(255, 209, 102, 0.2)' : row.status === 'Approved' ? 'rgba(6, 214, 160, 0.2)' : 'rgba(239, 71, 111, 0.2)',
            color: row.status === 'Pending' ? '#b45309' : row.status === 'Approved' ? 'var(--success-color)' : 'var(--danger-color)',
            fontWeight: 600
        }}>
            {row.status}
        </span>
    )},
    { header: 'Actions', align: 'right', render: (row) => (
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '5px' }}>
            {row.status === 'Pending' && (
                <>
                    <button className="btn btn-icon" style={{ color: 'var(--success-color)' }} onClick={() => handleApprove(row.id)} title="Approve">
                        <FiCheck />
                    </button>
                    <button className="btn btn-icon" style={{ color: 'var(--danger-color)' }} onClick={() => handleReject(row.id)} title="Reject">
                        <FiX />
                    </button>
                </>
            )}
            <button className="btn btn-icon" onClick={() => handleView(row)} title="View Details">
                <FiEye />
            </button>
        </div>
    )}
  ];

  const pendingRequests = leaveRequests.filter(req => req.status === 'Pending').length;
  const approvedThisWeek = 8; // Mock
  const rejectedThisMonth = 2; // Mock
  const onLeaveToday = 12; // Mock

  const filteredRequests = leaveRequests.filter(req => 
    req.employee.toLowerCase().includes(searchTerm.toLowerCase()) ||
    req.dept.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <Toaster position="top-right" />
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <h2 style={{ margin: 0, fontWeight: 700, fontSize: '1.5rem' }}>Leave Approval</h2>
          <p style={{ margin: '4px 0 0', color: 'var(--text-secondary)' }}>Manage employee leave requests.</p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="dashboard-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', marginBottom: '24px' }}>
        <Card title="Pending">
            <h2 style={{ margin: 0, fontSize: '2.5rem', color: 'var(--warning-color)' }}>{pendingRequests}</h2>
            <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Awaiting Action</span>
        </Card>
        <Card title="Approved">
            <h2 style={{ margin: 0, fontSize: '2.5rem', color: 'var(--success-color)' }}>{approvedThisWeek}</h2>
            <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>This Week</span>
        </Card>
        <Card title="Rejected">
            <h2 style={{ margin: 0, fontSize: '2.5rem', color: 'var(--danger-color)' }}>{rejectedThisMonth}</h2>
            <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>This Month</span>
        </Card>
        <Card title="On Leave">
            <h2 style={{ margin: 0, fontSize: '2.5rem', color: 'var(--primary-color)' }}>{onLeaveToday}</h2>
            <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Today</span>
        </Card>
      </div>

      {/* Filters & Table */}
      <Card className="mb-4">
        <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap', alignItems: 'flex-end', marginBottom: '20px' }}>
            <div style={{ flex: 1, minWidth: '200px' }}>
                <label className="form-label" style={{ display: 'block', marginBottom: '5px', fontSize: '0.875rem', fontWeight: 500 }}>Search</label>
                <div style={{ position: 'relative' }}>
                    <FiSearch style={{ position: 'absolute', left: '10px', top: '10px', color: 'var(--text-secondary)' }} />
                    <input 
                        type="text" 
                        className="form-control" 
                        placeholder="Search employee or dept..." 
                        style={{ paddingLeft: '35px' }}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>
            <div style={{ flex: 1, minWidth: '200px' }}>
                <label className="form-label" style={{ display: 'block', marginBottom: '5px', fontSize: '0.875rem', fontWeight: 500 }}>Department</label>
                <select className="form-control">
                    <option>All Departments</option>
                    <option>Computer Science</option>
                    <option>Information Technology</option>
                    <option>Engineering</option>
                </select>
            </div>
            <div style={{ flex: 1, minWidth: '200px' }}>
                <label className="form-label" style={{ display: 'block', marginBottom: '5px', fontSize: '0.875rem', fontWeight: 500 }}>Leave Type</label>
                <select className="form-control">
                    <option>All Types</option>
                    <option>Annual Leave</option>
                    <option>Sick Leave</option>
                    <option>Emergency Leave</option>
                </select>
            </div>
            <div style={{ flex: 1, minWidth: '200px' }}>
                <label className="form-label" style={{ display: 'block', marginBottom: '5px', fontSize: '0.875rem', fontWeight: 500 }}>Status</label>
                <select className="form-control">
                    <option>All Status</option>
                    <option>Pending</option>
                    <option>Approved</option>
                    <option>Rejected</option>
                </select>
            </div>
            <button className="btn btn-outline">
                <FiFilter /> Filter
            </button>
        </div>
        
        <DataTable 
            columns={columns} 
            data={filteredRequests} 
            pagination={true}
            itemsPerPage={5}
        />
      </Card>

      {/* View Details Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Leave Request Details"
        footer={
            selectedRequest && selectedRequest.status === 'Pending' ? (
                <>
                    <button className="btn btn-danger" onClick={() => handleReject(selectedRequest.id)}>Reject</button>
                    <button className="btn btn-success" style={{ backgroundColor: 'var(--success-color)', color: 'white' }} onClick={() => handleApprove(selectedRequest.id)}>Approve</button>
                </>
            ) : (
                <button className="btn btn-outline" onClick={() => setIsModalOpen(false)}>Close</button>
            )
        }
      >
        {selectedRequest && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px', paddingBottom: '15px', borderBottom: '1px solid var(--bg-body)' }}>
                    <div style={{ width: '50px', height: '50px', borderRadius: '50%', background: '#e0e7ff', color: 'var(--primary-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', fontWeight: 'bold' }}>
                        {selectedRequest.employee.charAt(0)}
                    </div>
                    <div>
                        <h3 style={{ margin: 0, fontSize: '1.1rem' }}>{selectedRequest.employee}</h3>
                        <span style={{ color: 'var(--text-secondary)' }}>{selectedRequest.dept}</span>
                    </div>
                    <div style={{ marginLeft: 'auto' }}>
                        <span style={{ 
                            padding: '4px 12px', 
                            borderRadius: '20px',
                            fontSize: '0.8rem',
                            backgroundColor: selectedRequest.status === 'Pending' ? 'rgba(255, 209, 102, 0.2)' : selectedRequest.status === 'Approved' ? 'rgba(6, 214, 160, 0.2)' : 'rgba(239, 71, 111, 0.2)',
                            color: selectedRequest.status === 'Pending' ? '#b45309' : selectedRequest.status === 'Approved' ? 'var(--success-color)' : 'var(--danger-color)',
                            fontWeight: 600
                        }}>
                            {selectedRequest.status}
                        </span>
                    </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div>
                        <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '4px' }}>Leave Type</label>
                        <div style={{ fontWeight: 500 }}>{selectedRequest.type}</div>
                    </div>
                    <div>
                        <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '4px' }}>Applied On</label>
                        <div style={{ fontWeight: 500 }}>{selectedRequest.appliedOn}</div>
                    </div>
                    <div>
                        <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '4px' }}>Start Date</label>
                        <div style={{ fontWeight: 500, display: 'flex', alignItems: 'center', gap: '5px' }}><FiCalendar /> {selectedRequest.startDate}</div>
                    </div>
                    <div>
                        <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '4px' }}>End Date</label>
                        <div style={{ fontWeight: 500, display: 'flex', alignItems: 'center', gap: '5px' }}><FiCalendar /> {selectedRequest.endDate}</div>
                    </div>
                    <div>
                        <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '4px' }}>Total Days</label>
                        <div style={{ fontWeight: 500, display: 'flex', alignItems: 'center', gap: '5px' }}><FiClock /> {selectedRequest.days} Days</div>
                    </div>
                    <div>
                        <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '4px' }}>Leave Balance</label>
                        <div style={{ fontWeight: 500 }}>{selectedRequest.balance} Days Remaining</div>
                    </div>
                </div>

                <div>
                    <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '4px' }}>Reason</label>
                    <div style={{ padding: '10px', backgroundColor: '#f9fafb', borderRadius: '6px', fontSize: '0.9rem', lineHeight: '1.5' }}>
                        {selectedRequest.reason}
                    </div>
                </div>
            </div>
        )}
      </Modal>
    </div>
  );
};

export default LeaveApproval;