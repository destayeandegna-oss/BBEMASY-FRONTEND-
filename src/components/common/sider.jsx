import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  FiHome, 
  FiUsers, 
  FiCalendar, 
  FiClock, 
  FiFileText,
  FiSettings,
  FiShield,
  FiLogOut,
  FiUserCheck,
  FiUserPlus,
  FiClipboard,
  FiActivity
} from 'react-icons/fi';
import { useAuth } from '../../services/authService';

const Sidebar = ({ collapsed }) => {
  const { user, logout } = useAuth();

  const employeeMenu = [
    { path: '/employee/dashboard', icon: FiHome, label: 'Dashboard' },
    { path: '/employee/check-in-out', icon: FiClock, label: 'Check In/Out' },
    { path: '/employee/attendance', icon: FiCalendar, label: 'My Attendance' },
    { path: '/employee/leave-request', icon: FiFileText, label: 'Leave Request' },
    { path: '/employee/profile', icon: FiUserCheck, label: 'Profile' },
  ];

  const hrMenu = [
    { path: '/hr/dashboard', icon: FiHome, label: 'Dashboard' },
    { path: '/hr/employees', icon: FiUsers, label: 'Employees' },
    { path: '/hr/attendance', icon: FiCalendar, label: 'Attendance' },
    { path: '/hr/leave-approval', icon: FiClipboard, label: 'Leave Approval' },
    { path: '/hr/biometric-enrollment', icon: FiUserPlus, label: 'Biometric Enrollment' },
    { path: '/hr/reports', icon: FiActivity, label: 'Reports' },
  ];

  const adminMenu = [
    { path: '/admin/dashboard', icon: FiHome, label: 'Dashboard' },
    { path: '/admin/users', icon: FiUsers, label: 'Users' },
    { path: '/admin/roles', icon: FiShield, label: 'Roles' },
    { path: '/admin/policies', icon: FiFileText, label: 'Policies' },
    { path: '/admin/workflows', icon: FiActivity, label: 'Workflows' },
    { path: '/admin/devices', icon: FiSettings, label: 'Devices' },
    { path: '/admin/audit-logs', icon: FiClipboard, label: 'Audit Logs' },
  ];

  const getMenuByRole = () => {
    switch (user?.role) {
      case 'admin':
        return adminMenu;
      case 'hr':
        return hrMenu;
      case 'employee':
        return employeeMenu;
      default:
        return [];
    }
  };

  return (
    <div className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-header">
        <img src="/logo.png" alt="Logo" style={{ width: '40px', height: '40px' }} />
        {!collapsed && <h3>BBMSS</h3>}
      </div>

      <div className="sidebar-menu">
        {getMenuByRole().map((item, index) => (
          <NavLink
            key={index}
            to={item.path}
            className={({ isActive }) => 
              `sidebar-menu-item ${isActive ? 'active' : ''}`
            }
          >
            <item.icon />
            {!collapsed && <span>{item.label}</span>}
          </NavLink>
        ))}

        <div className="sidebar-menu-item" onClick={logout}>
          <FiLogOut />
          {!collapsed && <span>Logout</span>}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;