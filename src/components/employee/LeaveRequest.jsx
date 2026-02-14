import React, { useState } from 'react';
import toast from 'react-hot-toast';

const LeaveRequest = () => {
  const [formData, setFormData] = useState({
    leaveType: 'annual',
    startDate: '',
    endDate: '',
    reason: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate dates
    if (new Date(formData.startDate) > new Date(formData.endDate)) {
      toast.error('End date must be after start date');
      return;
    }

    toast.loading('Submitting leave request...', { id: 'leave' });
    
    setTimeout(() => {
      toast.success('Leave request submitted successfully!', { id: 'leave' });
      setFormData({
        leaveType: 'annual',
        startDate: '',
        endDate: '',
        reason: '',
      });
    }, 1500);
  };

  return (
    <div>
      <h1>Leave Request</h1>
      
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px', marginTop: '30px' }}>
        <div className="form-container" style={{ maxWidth: '100%' }}>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Leave Type</label>
              <select
                name="leaveType"
                className="form-control"
                value={formData.leaveType}
                onChange={handleChange}
                required
              >
                <option value="annual">Annual Leave</option>
                <option value="sick">Sick Leave</option>
                <option value="emergency">Emergency Leave</option>
                <option value="maternity">Maternity Leave</option>
                <option value="paternity">Paternity Leave</option>
                <option value="unpaid">Unpaid Leave</option>
              </select>
            </div>

            <div className="form-group">
              <label>Start Date</label>
              <input
                type="date"
                name="startDate"
                className="form-control"
                value={formData.startDate}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>End Date</label>
              <input
                type="date"
                name="endDate"
                className="form-control"
                value={formData.endDate}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Reason for Leave</label>
              <textarea
                name="reason"
                className="form-control"
                rows="4"
                value={formData.reason}
                onChange={handleChange}
                required
                placeholder="Please provide a detailed reason for your leave request..."
              />
            </div>

            <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
              Submit Leave Request
            </button>
          </form>
        </div>

        <div className="table-container">
          <h3>Leave Balance</h3>
          <table>
            <tbody>
              <tr>
                <td>Annual Leave</td>
                <td><strong>15 days</strong></td>
                <td><span className="badge badge-success">Available</span></td>
              </tr>
              <tr>
                <td>Sick Leave</td>
                <td><strong>10 days</strong></td>
                <td><span className="badge badge-success">Available</span></td>
              </tr>
              <tr>
                <td>Emergency Leave</td>
                <td><strong>5 days</strong></td>
                <td><span className="badge badge-success">Available</span></td>
              </tr>
            </tbody>
          </table>

          <h3 style={{ marginTop: '30px' }}>Recent Requests</h3>
          <table>
            <thead>
              <tr>
                <th>Type</th>
                <th>Dates</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Annual</td>
                <td>Jan 15-20, 2025</td>
                <td><span className="badge badge-success">Approved</span></td>
              </tr>
              <tr>
                <td>Sick</td>
                <td>Feb 1-3, 2025</td>
                <td><span className="badge badge-warning">Pending</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default LeaveRequest;