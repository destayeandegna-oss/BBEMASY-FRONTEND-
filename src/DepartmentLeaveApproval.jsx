import React from 'react';
import { FiCheck, FiX, FiEye } from 'react-icons/fi';

const LeaveApproval = () => {
  return (
    <div>
      <h1>Leave Approval</h1>
      <p>Approve or reject leave requests for your department.</p>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Employee</th>
              <th>Leave Type</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>John Doe</td>
              <td>Annual Leave</td>
              <td>2025-03-10</td>
              <td>2025-03-15</td>
              <td><span className="badge badge-warning">Pending</span></td>
              <td>
                <button className="btn btn-success" style={{ padding: '5px 10px' }}>
                  <FiCheck /> Approve
                </button>
                <button className="btn btn-danger" style={{ padding: '5px 10px' }}>
                  <FiX /> Reject
                </button>
                <button className="btn" style={{ padding: '5px 10px' }}>
                  <FiEye /> View
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        <em>No pending leave requests.</em>
      </p>
    </div>
  );
};

export default LeaveApproval;