import React, { useState } from 'react';
import DataTable from '../common/DataTable';
import Modal from '../common/Modal';
import { FiMail, FiPhone, FiMapPin, FiCalendar, FiUser, FiEye, FiActivity } from 'react-icons/fi';

const TeamManagement = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);

  // Mock data with more details
  const [teamMembers] = useState([
    { 
      id: 1, 
      name: 'Alice Johnson', 
      role: 'Senior Developer', 
      email: 'alice@hu.edu.et', 
      status: 'Active', 
      phone: '+251 911 111 111',
      department: 'Computer Science',
      location: 'Building A, Room 301',
      joinDate: '2020-09-15',
      bio: 'Alice is a senior developer with expertise in React and Node.js. She leads the frontend team.',
      attendance: '98%'
    },
    { 
      id: 2, 
      name: 'Bob Smith', 
      role: 'Developer', 
      email: 'bob@hu.edu.et', 
      status: 'Active', 
      phone: '+251 922 222 222',
      department: 'Computer Science',
      location: 'Building A, Room 302',
      joinDate: '2021-03-10',
      bio: 'Bob is a backend developer focused on database optimization and API design.',
      attendance: '95%'
    },
    { 
      id: 3, 
      name: 'Charlie Brown', 
      role: 'Intern', 
      email: 'charlie@hu.edu.et', 
      status: 'On Leave', 
      phone: '+251 933 333 333',
      department: 'Computer Science',
      location: 'Building B, Lab 1',
      joinDate: '2023-01-20',
      bio: 'Charlie is an intern working on the new student portal.',
      attendance: '90%'
    },
  ]);

  const handleViewProfile = (member) => {
    setSelectedMember(member);
    setIsModalOpen(true);
  };

  const columns = [
    { header: 'Employee', accessor: 'employee', render: (row) => <strong>{row.employee}</strong> },
    { header: 'Department', accessor: 'department' },
    { header: 'Role', accessor: 'role' },
    { header: 'Contact', accessor: 'email' },
    { header: 'Status', accessor: 'status' },
    { header: 'Join Date', accessor: 'joinDate' },
  ];

  return (
    <div>
      <h1>Team Management</h1>
      <p>Manage your department members here.</p>
      
      <DataTable 
        title="Team Members" 
        columns={columns} 
        data={teamMembers} 
      />
    </div>
  );
};

export default TeamManagement;