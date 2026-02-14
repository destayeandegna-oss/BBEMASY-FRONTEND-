export const getEmployeeAttendance = async () => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return [
    { date: '2023-10-26', status: 'Present', checkIn: '08:30 AM', checkOut: '05:30 PM' },
    { date: '2023-10-27', status: 'Present', checkIn: '08:35 AM', checkOut: '05:25 PM' },
  ];
};

export const getEmployeeStats = async () => {
  await new Promise(resolve => setTimeout(resolve, 500));
  return { attendance: 95, leaves: 2, late: 1 };
};