import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import DashboardLayout, { HomeIcon, UsersIcon, SettingsIcon, ChartIcon, BellIcon } from './components/DashboardLayout';
import DeviceManagement from './components/admin/DeviceManagement';
import AdminDashboard from './components/admin/AdminDashboard';
import UserManagement from './components/admin/UserManagement';
import Roles from './components/admin/Roles';
import Policies from './components/admin/Policies';
import Workflows from './components/admin/Workflows';
import AuditLogs from './components/admin/AuditLogs';
import Settings from './components/admin/Settings';

const AdminPage = () => {
  const navItems = [
    { to: "/admin/dashboard", icon: <HomeIcon />, label: "Dashboard" },
    { to: "/admin/users", icon: <UsersIcon />, label: "System Users" },
    { to: "/admin/roles", icon: <SettingsIcon />, label: "Roles & Permissions" },
    { to: "/admin/devices", icon: <SettingsIcon />, label: "Biometric Devices" },
    { to: "/admin/policies", icon: <ChartIcon />, label: "System Policies" },
    { to: "/admin/workflows", icon: <BellIcon />, label: "Workflows" },
    { to: "/admin/audit-logs", icon: <ChartIcon />, label: "Audit Logs" },
    { to: "/admin/settings", icon: <SettingsIcon />, label: "Settings" },
  ];

  return (
    <Routes>
      <Route element={<DashboardLayout title="System Admin" navItems={navItems} />}>
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="users" element={<UserManagement />} />
        <Route path="roles" element={<Roles />} />
        <Route path="policies" element={<Policies />} />
        <Route path="workflows" element={<Workflows />} />
        <Route path="devices" element={<DeviceManagement />} />
        <Route path="audit-logs" element={<AuditLogs />} />
        <Route path="settings" element={<Settings />} />
        <Route path="*" element={<Navigate to="dashboard" />} />
      </Route>
    </Routes>
  );
};

export default AdminPage;