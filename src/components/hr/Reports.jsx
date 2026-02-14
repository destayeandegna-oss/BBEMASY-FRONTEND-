import React, { useState } from 'react';
import { FiDownload, FiFilter, FiPrinter } from 'react-icons/fi';
import { jsPDF } from 'jspdf';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import toast, { Toaster } from 'react-hot-toast';
import Card from '../common/Card';

const Reports = () => {
  const [reportType, setReportType] = useState('attendance');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });

  // Mock Data for Charts
  const attendanceData = [
    { name: 'Jan', Present: 400, Absent: 24, Late: 24 },
    { name: 'Feb', Present: 300, Absent: 13, Late: 22 },
    { name: 'Mar', Present: 200, Absent: 58, Late: 22 },
    { name: 'Apr', Present: 278, Absent: 39, Late: 20 },
    { name: 'May', Present: 189, Absent: 48, Late: 21 },
    { name: 'Jun', Present: 239, Absent: 38, Late: 25 },
  ];

  const leaveData = [
    { name: 'Sick Leave', value: 400 },
    { name: 'Annual Leave', value: 300 },
    { name: 'Emergency', value: 300 },
    { name: 'Unpaid', value: 200 },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  const handleGenerate = () => {
    if (!dateRange.start || !dateRange.end) {
        toast.error('Please select a date range');
        return;
    }
    toast.loading(`Generating ${reportType} report...`, { duration: 2000 });
    setTimeout(() => toast.success('Report generated successfully'), 2000);
  };

  const handleExport = (format) => {
    toast.success(`Exporting as ${format}...`);
  };
  const generatePdf = () => {
    const doc = new jsPDF();
    doc.text('Attendance Report', 10, 10);
    doc.save('attendance_report.pdf');
  };

  return (
    <div>
      <Toaster position="top-right" />
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <h2 style={{ margin: 0, fontWeight: 700, fontSize: '1.5rem' }}>Reports & Analytics</h2>
          <p style={{ margin: '4px 0 0', color: 'var(--text-secondary)' }}>Generate insights and export data.</p>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
            <button className="btn btn-outline" onClick={() => handleExport('CSV')}><FiDownload /> Export CSV</button>
            <button className="btn btn-outline" onClick={() => handleExport('PDF')}><FiPrinter /> Print PDF</button>
        </div>
      </div>

      <Card className="mb-4">
        <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap', alignItems: 'flex-end' }}>
            <div style={{ flex: 1, minWidth: '200px' }}>
                <label className="form-label" style={{ display: 'block', marginBottom: '5px', fontSize: '0.875rem', fontWeight: 500 }}>Report Type</label>
                <select 
                    className="form-control" 
                    value={reportType}
                    onChange={(e) => setReportType(e.target.value)}
                >
                    <option value="attendance">Attendance Summary</option>
                    <option value="leave">Leave Analysis</option>
                    <option value="performance">Employee Performance</option>
                </select>
            </div>
            <div style={{ flex: 1, minWidth: '200px' }}>
                <label className="form-label" style={{ display: 'block', marginBottom: '5px', fontSize: '0.875rem', fontWeight: 500 }}>Start Date</label>
                <input 
                    type="date" 
                    className="form-control" 
                    value={dateRange.start}
                    onChange={(e) => setDateRange({...dateRange, start: e.target.value})}
                />
            </div>
            <div style={{ flex: 1, minWidth: '200px' }}>
                <label className="form-label" style={{ display: 'block', marginBottom: '5px', fontSize: '0.875rem', fontWeight: 500 }}>End Date</label>
                <input 
                    type="date" 
                    className="form-control" 
                    value={dateRange.end}
                    onChange={(e) => setDateRange({...dateRange, end: e.target.value})}
                />
            </div>
            <button className="btn btn-primary" onClick={handleGenerate}>
                <FiFilter /> Generate Report
            </button>
        </div>
      </Card>

      <div className="dashboard-grid" style={{ gridTemplateColumns: '2fr 1fr' }}>
        <Card title={reportType === 'attendance' ? "Attendance Trends" : "Report Overview"}>
            <div style={{ height: '300px', width: '100%' }}>
                <ResponsiveContainer width="100%" height="100%">
                    {reportType === 'attendance' ? (
                        <BarChart data={attendanceData}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
                            <XAxis dataKey="name" axisLine={false} tickLine={false} />
                            <YAxis axisLine={false} tickLine={false} />
                            <Tooltip cursor={{ fill: 'transparent' }} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                            <Legend />
                            <Bar dataKey="Present" fill="#4361ee" radius={[4, 4, 0, 0]} />
                            <Bar dataKey="Absent" fill="#ef476f" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    ) : (
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: '#999' }}>
                            Chart data available for Attendance only in demo.
                        </div>
                    )}
                </ResponsiveContainer>
            </div>
        </Card>

        <Card title="Leave Distribution">
            <div style={{ height: '300px', width: '100%' }}>
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={leaveData}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={80}
                            fill="#8884d8"
                            paddingAngle={5}
                            dataKey="value"
                        >
                            {leaveData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </Card>
      </div>
      
      <Card title="Detailed Report Data">
          <div style={{ padding: '40px', textAlign: 'center', color: 'var(--text-secondary)', background: '#f9fafb', borderRadius: '8px', border: '1px dashed #e5e7eb' }}>
              <p>Select a report type and date range above to generate detailed data tables.</p>
          </div>
      </Card>
    </div>
  );
};

export default Reports;