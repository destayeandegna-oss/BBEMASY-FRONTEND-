import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import DashboardLayout, { HomeIcon, ChartIcon, BellIcon, SettingsIcon, UserIcon } from './components/DashboardLayout';
import EmployeeDashboard from './components/employee/EmployeeDashboard';
import AttendanceView from './components/employee/AttendanceView';
import LeaveRequest from './components/employee/LeaveRequest';
import CheckInOut from './components/employee/CheckInOut';
import Profile from './components/employee/Profile';

const EmployeePage = () => {
  const navItems = [
    { to: "/employee/dashboard", icon: <HomeIcon />, label: "Dashboard" },
    { to: "/employee/attendance", icon: <ChartIcon />, label: "Attendance" },
    { to: "/employee/leave-request", icon: <BellIcon />, label: "Leave Request" },
    { to: "/employee/check-in-out", icon: <SettingsIcon />, label: "Check In/Out" },
    { to: "/employee/profile", icon: <UserIcon />, label: "Profile" },
  ];

  return (
    <Routes>
      <Route element={<DashboardLayout title="Employee Portal" navItems={navItems} />}>
        <Route path="dashboard" element={<EmployeeDashboard />} />
        <Route path="attendance" element={<AttendanceView />} />
        <Route path="leave-request" element={<LeaveRequest />} />
        <Route path="check-in-out" element={<CheckInOut />} />
        <Route path="profile" element={<Profile />} />
        <Route path="*" element={<Navigate to="dashboard" />} />
      </Route>
    </Routes>
  );
};

export default EmployeePage;