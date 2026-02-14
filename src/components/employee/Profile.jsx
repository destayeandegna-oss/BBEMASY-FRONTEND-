import React, { useState } from 'react';
import { FiUser, FiMail, FiBriefcase, FiPhone, FiMapPin, FiLock } from 'react-icons/fi';
import { useAuth } from '../../services/authService';
import ChangePasswordModal from '../common/ChangePasswordModal';

const Profile = () => {
  const { user } = useAuth();
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);

  return (
    <div className="profile-page">
      <h1>My Profile</h1>
      <div className="form-container" style={{ maxWidth: '800px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '30px' }}>
          <div style={{ 
            width: '100px', 
            height: '100px', 
            borderRadius: '50%', 
            background: '#e3f2fd', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            fontSize: '40px',
            color: '#1a237e'
          }}>
            <FiUser />
          </div>
          <div>
            <h2 style={{ margin: 0 }}>{user?.name || 'Employee Name'}</h2>
            <p style={{ color: '#666', margin: '5px 0' }}>{user?.role?.toUpperCase() || 'EMPLOYEE'}</p>
            <span className="badge badge-success">Active</span>
          </div>
          <div style={{ marginLeft: 'auto' }}>
             <button className="btn btn-outline" onClick={() => setIsPasswordModalOpen(true)}>
               <FiLock style={{ marginRight: '5px' }} /> Change Password
             </button>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          <div className="form-group">
            <label><FiUser /> Full Name</label>
            <input type="text" className="form-control" value={user?.name || ''} readOnly />
          </div>
          <div className="form-group">
            <label><FiMail /> Email Address</label>
            <input type="email" className="form-control" value={user?.email || ''} readOnly />
          </div>
          <div className="form-group">
            <label><FiBriefcase /> Department</label>
            <input type="text" className="form-control" value="Computer Science" readOnly />
          </div>
          <div className="form-group">
            <label><FiBriefcase /> Position</label>
            <input type="text" className="form-control" value="Lecturer" readOnly />
          </div>
          <div className="form-group">
            <label><FiPhone /> Phone</label>
            <input type="text" className="form-control" value="+251 911 234 567" readOnly />
          </div>
          <div className="form-group">
            <label><FiMapPin /> Office Location</label>
            <input type="text" className="form-control" value="Building A, Room 204" readOnly />
          </div>
        </div>
      </div>
      
      <ChangePasswordModal 
        isOpen={isPasswordModalOpen} 
        onClose={() => setIsPasswordModalOpen(false)} 
      />
    </div>
  );
};

export default Profile;