import React, { useState } from 'react';
import Modal from './Modal';
import { FiLock } from 'react-icons/fi';
import toast from 'react-hot-toast';

const ChangePasswordModal = ({ isOpen, onClose }) => {
  const [passwords, setPasswords] = useState({
    current: '',
    new: '',
    confirm: ''
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setPasswords({ ...passwords, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (passwords.new !== passwords.confirm) {
      toast.error('New passwords do not match');
      return;
    }
    if (passwords.new.length < 6) {
        toast.error('Password must be at least 6 characters');
        return;
    }

    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      toast.success('Password changed successfully');
      setPasswords({ current: '', new: '', confirm: '' });
      onClose();
    }, 1500);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Change Password"
      footer={
        <>
          <button className="btn btn-outline" onClick={onClose} disabled={loading}>Cancel</button>
          <button className="btn btn-primary" onClick={handleSubmit} disabled={loading}>
            {loading ? 'Updating...' : 'Update Password'}
          </button>
        </>
      }
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div className="form-group">
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Current Password</label>
          <div className="input-wrapper">
            <FiLock className="input-icon" />
            <input
              type="password"
              name="current"
              className="form-control"
              style={{ paddingLeft: '2.5rem' }}
              value={passwords.current}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="form-group">
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>New Password</label>
          <div className="input-wrapper">
            <FiLock className="input-icon" />
            <input
              type="password"
              name="new"
              className="form-control"
              style={{ paddingLeft: '2.5rem' }}
              value={passwords.new}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="form-group">
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Confirm New Password</label>
          <div className="input-wrapper">
            <FiLock className="input-icon" />
            <input
              type="password"
              name="confirm"
              className="form-control"
              style={{ paddingLeft: '2.5rem' }}
              value={passwords.confirm}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ChangePasswordModal;