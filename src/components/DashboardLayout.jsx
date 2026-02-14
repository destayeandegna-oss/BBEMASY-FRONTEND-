import React, { useState } from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../services/authService';
import Breadcrumbs from './common/Breadcrumbs';
import '../styles/App.css';

const DashboardLayout = ({ title = "BBEMSS", navItems }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const location = useLocation();

  const toggleSidebar = () => setCollapsed(!collapsed);
  
  const toggleTheme = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle('dark-mode');
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Default items if none provided
  const defaultNavItems = [
    { to: "/", icon: <HomeIcon />, label: "Dashboard" },
    { to: "/analytics", icon: <ChartIcon />, label: "Analytics" },
    { to: "/users", icon: <UsersIcon />, label: "Users" },
    { to: "/settings", icon: <SettingsIcon />, label: "Settings" },
  ];

  const itemsToRender = navItems || defaultNavItems;

  return (
    <div className="layout">
      {/* Sidebar */}
      <aside className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
        <div className="sidebar-header">
          <h3>{title}</h3>
        </div>
        
        <nav className="sidebar-menu">
          {itemsToRender.map((item, index) => (
            <NavItem 
              key={index}
              to={item.to} 
              icon={item.icon} 
              label={item.label} 
              active={location.pathname === item.to || location.pathname.startsWith(item.to + '/')} 
            />
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className={`main-content ${collapsed ? 'collapsed' : ''}`}>
        <header className="header">
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <button className="btn-icon" onClick={toggleSidebar}>
              <MenuIcon />
            </button>
            <h2 style={{ margin: '0 0 0 1rem', fontSize: '1.25rem', fontWeight: 600 }}>
              Dashboard
            </h2>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <button className="btn-icon" onClick={toggleTheme} title="Toggle Theme">
              {darkMode ? <SunIcon /> : <MoonIcon />}
            </button>
            
            <div className="notification-wrapper">
              <button className="btn-icon" title="Notifications">
                <BellIcon />
              </button>
              <span className="notification-badge"></span>
            </div>

            <div className="user-profile" style={{ marginLeft: '0.5rem', position: 'relative' }}>
               <div style={{ 
                 width: '35px', 
                 height: '35px', 
                 borderRadius: '50%', 
                 backgroundColor: '#e5e7eb',
                 display: 'flex',
                 alignItems: 'center',
                 justifyContent: 'center',
                 cursor: 'pointer',
                 color: '#374151'
               }} onClick={() => setShowProfileMenu(!showProfileMenu)}>
                 <UserIcon />
               </div>
               
               {showProfileMenu && (
                 <div className="notification-dropdown" style={{ width: '200px', right: 0 }}>
                   <div className="notification-header" style={{ flexDirection: 'column', alignItems: 'flex-start', gap: '2px' }}>
                     <span>{user?.name || 'User'}</span>
                     <span style={{ fontSize: '11px', color: 'var(--text-secondary)', fontWeight: 'normal' }}>
                       {user?.email || user?.role || 'Account'}
                     </span>
                   </div>
                   <div className="notification-list" style={{ maxHeight: 'none' }}>
                      <div className="notification-item" onClick={() => navigate(user?.role === 'hr' ? '/hr/profile' : '/employee/profile')}>
                        <div className="notification-text">My Profile</div>
                      </div>
                      <div className="notification-item" onClick={handleLogout}>
                        <div className="notification-text" style={{ color: 'var(--danger-color)' }}>Logout</div>
                      </div>
                   </div>
                 </div>
               )}
            </div>
          </div>
        </header>

        <div className="content-area">
          <Breadcrumbs />
          <Outlet />
        </div>
      </main>
    </div>
  );
};

// Helper Component for Nav Items
const NavItem = ({ to, icon, label, active }) => (
  <Link to={to} className={`sidebar-menu-item ${active ? 'active' : ''}`}>
    {icon}
    <span>{label}</span>
  </Link>
);

// Icons (Simple SVGs)
export const MenuIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
);
export const HomeIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
);
export const ChartIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg>
);
export const UsersIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
);
export const SettingsIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
);
export const BellIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>
);
export const MoonIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
);
export const SunIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>
);
export const UserIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
);

export default DashboardLayout;