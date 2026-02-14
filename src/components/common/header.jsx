import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiMenu, FiBell, FiUser, FiMoon, FiSun } from 'react-icons/fi';
import { useAuth } from '../../services/authService';

const Header = ({ toggleSidebar, collapsed }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, text: 'New leave request from John Doe', time: '5 mins ago', read: false },
    { id: 2, text: 'System maintenance scheduled', time: '1 hour ago', read: false },
    { id: 3, text: 'Attendance report generated', time: '2 hours ago', read: true },
  ]);

  const markAllRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  useEffect(() => {
    const isDark = localStorage.getItem('darkMode') === 'true';
    setDarkMode(isDark);
    if (isDark) {
      document.body.classList.add('dark-mode');
    }
  }, []);

  const toggleTheme = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem('darkMode', newMode);
    document.body.classList.toggle('dark-mode', newMode);
  };

  return (
    <header className={`header ${collapsed ? 'collapsed' : ''}`}>
      <div className="header-left">
        <button className="btn-icon" onClick={toggleSidebar}>
          <FiMenu size={24} />
        </button>
      </div>
      
      <div className="header-right">
        <button className="btn-icon" onClick={toggleTheme}>
          {darkMode ? <FiSun size={20} /> : <FiMoon size={20} />}
        </button>
        <div className="notification-wrapper" style={{ position: 'relative' }}>
          <button className="btn-icon" onClick={() => setShowNotifications(!showNotifications)}>
            <FiBell size={20} />
            {unreadCount > 0 && <span className="notification-badge"></span>}
          </button>
          
          {showNotifications && (
            <div className="notification-dropdown">
              <div className="notification-header">
                <span>Notifications</span>
                <button onClick={markAllRead} className="mark-read-btn">Mark all read</button>
              </div>
              <div className="notification-list">
                {notifications.length === 0 ? (
                  <div className="notification-empty" style={{ padding: '20px', textAlign: 'center', color: '#666' }}>No notifications</div>
                ) : (
                  notifications.map(n => (
                    <div key={n.id} className={`notification-item ${!n.read ? 'unread' : ''}`}>
                      <div className="notification-text">{n.text}</div>
                      <div className="notification-time">{n.time}</div>
                    </div>
                  ))
                )}
              </div>
              <div className="notification-footer">
                <button>View All</button>
              </div>
            </div>
          )}
        </div>
        
        <div className="user-menu">
          <button className="btn-icon" onClick={() => navigate('/profile')}>
            <FiUser size={20} />
          </button>
          <div className="user-info">
            <span className="user-name">{user?.name}</span>
            <span className="user-role">{user?.role}</span>
          </div>
        </div>
        
        <button className="btn-logout" onClick={logout}>
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;