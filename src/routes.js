export const routes = {
  // Public routes
  home: '/',
  login: '/login',
  biometricLogin: '/biometric-login',

  // Employee routes
  employee: {
    dashboard: '/employee/dashboard',
    attendance: '/employee/attendance',
    leaveRequest: '/employee/leave-request',
    checkInOut: '/employee/check-in-out',
    profile: '/employee/profile',
  },

  // HR routes
  hr: {
    dashboard: '/hr/dashboard',
    employees: '/hr/employees',
    attendance: '/hr/attendance',
    leaveApproval: '/hr/leave-approval',
    reports: '/hr/reports',
    biometricEnrollment: '/hr/biometric-enrollment',
  },

  // Admin routes
  admin: {
    dashboard: '/admin/dashboard',
    users: '/admin/users',
    roles: '/admin/roles',
    policies: '/admin/policies',
    workflows: '/admin/workflows',
    devices: '/admin/devices',
    auditLogs: '/admin/audit-logs',
  },
};