import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import DashboardLayout, { HomeIcon, UsersIcon, ChartIcon, BellIcon, UserIcon } from './components/DashboardLayout.jsx';
import DepartmentHeadDashboard from './components/department/DepartmentHeadDashboard.jsx';
import TeamManagement from './components/department/TeamManagement';
import DepartmentLeaveApproval from './components/department/DepartmentLeaveApproval';
import DepartmentAttendance from './components/department/DepartmentAttendance';
import Profile from './components/employee/Profile';

const DepartmentHeadPage = () => {
  const navItems = [
    { to: "/department-head/dashboard", icon: <HomeIcon />, label: "Dashboard" },
    { to: "/department-head/team", icon: <UsersIcon />, label: "My Team" },
    { to: "/department-head/attendance", icon: <ChartIcon />, label: "Attendance" },
    { to: "/department-head/leaves", icon: <BellIcon />, label: "Leave Requests" },
    { to: "/department-head/profile", icon: <UserIcon />, label: "Profile" },
  ];

  const renderElement = (element) => (
    <ErrorBoundary>
      {element}
    </ErrorBoundary>
  );

  return (
    <Routes>
      <Route element={<DashboardLayout title="Department Head" navItems={navItems} />}>
        <Route path="dashboard" element={renderElement(<DepartmentHeadDashboard />)} />
        <Route path="team" element={renderElement(<TeamManagement />)} />
        <Route path="attendance" element={renderElement(<DepartmentAttendance />)} />
        <Route path="leaves" element={renderElement(<DepartmentLeaveApproval />)} />
        <Route path="profile" element={renderElement(<Profile />)} />
        <Route path="*" element={<Navigate to="dashboard" />} />
      </Route>
    </Routes>
  );
};



export default DepartmentHeadPage;