import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import DashboardLayout, { HomeIcon, UsersIcon, ChartIcon, BellIcon, SettingsIcon, UserIcon } from './components/DashboardLayout';
import BiometricEnrollment from './components/hr/BiometricEnrollment';
import HRDashboard from './components/hr/HRDashboard';
import EmployeeManagement from './components/hr/EmployeeManagement';
import AttendanceManagement from './components/hr/AttendanceManagement';
import LeaveApproval from './components/hr/LeaveApproval';
import Reports from './components/hr/Reports';
import Profile from './components/employee/Profile';

const HRPage = () => {
  const navItems = [
    { to: "/hr/dashboard", icon: <HomeIcon />, label: "Dashboard" },
    { to: "/hr/employees", icon: <UsersIcon />, label: "Employee Directory" },
    { to: "/hr/attendance", icon: <ChartIcon />, label: "Attendance Records" },
    { to: "/hr/leave-approval", icon: <BellIcon />, label: "Leave Requests" },
    { to: "/hr/biometric-enrollment", icon: <SettingsIcon />, label: "Enrollment" },
    { to: "/hr/reports", icon: <ChartIcon />, label: "Reports & Analytics" },
    { to: "/hr/profile", icon: <UserIcon />, label: "Profile" },
  ];

  return (
    <Routes>
      <Route element={<DashboardLayout title="HR Portal" navItems={navItems} />}>
        <Route path="dashboard" element={<HRDashboard />} />
        <Route path="employees" element={<EmployeeManagement />} />
        <Route path="attendance" element={<AttendanceManagement />} />
        <Route path="leave-approval" element={<LeaveApproval />} />
        <Route path="biometric-enrollment" element={<BiometricEnrollment />} />
        <Route path="reports" element={<Reports />} />
        <Route path="profile" element={<Profile />} />
        <Route path="*" element={<Navigate to="dashboard" />} />
      </Route>
    </Routes>
  );
};

export default HRPage;