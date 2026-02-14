import React, { useState } from 'react';
import DataTable from '../common/DataTable';
import Card from '../common/Card';
import Modal from '../common/Modal';
import { FiServer, FiPlus, FiRefreshCw, FiEdit2, FiTrash2, FiCheckCircle, FiXCircle } from 'react-icons/fi';
import toast from 'react-hot-toast';

const DeviceManagement = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [devices, setDevices] = useState([
    { id: 1, name: 'Main Entrance Scanner', ip: '192.168.1.101', location: 'Building A, Entrance', status: 'Online', lastSync: '2 mins ago' },
    { id: 2, name: 'Lab 3 Scanner', ip: '192.168.1.105', location: 'Building B, Lab 3', status: 'Offline', lastSync: '2 hours ago' },
    { id: 3, name: 'HR Office Scanner', ip: '192.168.1.110', location: 'Admin Block, 2nd Floor', status: 'Online', lastSync: '5 mins ago' },
  ]);

  const [newDevice, setNewDevice] = useState({ name: '', ip: '', location: '' });

  const handleAddDevice = () => {
    if (!newDevice.name || !newDevice.ip) {
        toast.error("Please fill in required fields");
        return;
    }
    const device = {
      id: devices.length + 1,
      ...newDevice,
      status: 'Offline', // Default status for new device
      lastSync: 'Never'
    };
    setDevices([...devices, device]);
    setIsModalOpen(false);
    setNewDevice({ name: '', ip: '', location: '' });
    toast.success("Device added successfully");
  };

  const handleSync = (id) => {
      toast.loading("Syncing device...", { duration: 2000, id: 'sync' });
      // Simulate sync
      setTimeout(() => {
          setDevices(devices.map(d => d.id === id ? {...d, status: 'Online', lastSync: 'Just now'} : d));
          toast.success("Device synced", { id: 'sync' });
      }, 2000);
  }

  const handleDelete = (id) => {
      if(window.confirm("Are you sure you want to remove this device?")) {
          setDevices(devices.filter(d => d.id !== id));
          toast.success("Device removed");
      }
  }

  const columns = [
    { 
      header: 'Device Name', 
      accessor: 'name',
      render: (row) => (
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ padding: '8px', borderRadius: '50%', background: '#e3f2fd', color: '#1565c0' }}>
                  <FiServer />
              </div>
              <span style={{ fontWeight: 500 }}>{row.name}</span>
          </div>
      )
    },
    { header: 'IP Address', accessor: 'ip' },
    { header: 'Location', accessor: 'location' },
    { 
      header: 'Status', 
      accessor: 'status', 
      render: (row) => (
        <span style={{ 
            display: 'flex', alignItems: 'center', gap: '5px',
            color: row.status === 'Online' ? 'var(--success-color)' : 'var(--danger-color)', 
            fontWeight: 500 
        }}>
          {row.status === 'Online' ? <FiCheckCircle /> : <FiXCircle />}
          {row.status}
        </span>
      )
    },
    { header: 'Last Sync', accessor: 'lastSync' },
    { 
      header: 'Actions', 
      align: 'right', 
      render: (row) => (
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
          <button className="btn btn-outline btn-sm" onClick={() => handleSync(row.id)} title="Sync">
              <FiRefreshCw />
          </button>
          <button className="btn btn-outline btn-sm" title="Edit">
              <FiEdit2 />
          </button>
          <button className="btn btn-outline btn-sm" style={{ color: 'var(--danger-color)', borderColor: 'rgba(239, 71, 111, 0.3)' }} onClick={() => handleDelete(row.id)} title="Delete">
              <FiTrash2 />
          </button>
        </div>
      )
    }
  ];

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <h2 style={{ margin: 0, fontWeight: 700, fontSize: '1.5rem' }}>Device Management</h2>
          <p style={{ margin: '4px 0 0', color: 'var(--text-secondary)' }}>Monitor and configure biometric devices.</p>
        </div>
        <button className="btn btn-primary" onClick={() => setIsModalOpen(true)}>
          <FiPlus style={{ marginRight: '5px' }} /> Add Device
        </button>
      </div>

      <div className="dashboard-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', marginBottom: '24px' }}>
        <Card title="Total Devices">
            <h2 style={{ margin: 0, fontSize: '2.5rem', color: 'var(--primary-color)' }}>{devices.length}</h2>
        </Card>
        <Card title="Online">
            <h2 style={{ margin: 0, fontSize: '2.5rem', color: 'var(--success-color)' }}>
                {devices.filter(d => d.status === 'Online').length}
            </h2>
        </Card>
        <Card title="Offline">
            <h2 style={{ margin: 0, fontSize: '2.5rem', color: 'var(--danger-color)' }}>
                {devices.filter(d => d.status === 'Offline').length}
            </h2>
        </Card>
      </div>

      <DataTable 
        title="Registered Devices" 
        columns={columns} 
        data={devices} 
        pagination={true}
        itemsPerPage={5}
      />

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Add New Device"
        footer={
          <>
            <button className="btn btn-outline" onClick={() => setIsModalOpen(false)}>Cancel</button>
            <button className="btn btn-primary" onClick={handleAddDevice}>Add Device</button>
          </>
        }
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <label className="form-label" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Device Name</label>
            <input 
                type="text" 
                className="form-control" 
                value={newDevice.name} 
                onChange={(e) => setNewDevice({...newDevice, name: e.target.value})} 
                placeholder="e.g. Entrance Scanner" 
            />
          </div>
          <div>
            <label className="form-label" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>IP Address</label>
            <input 
                type="text" 
                className="form-control" 
                value={newDevice.ip} 
                onChange={(e) => setNewDevice({...newDevice, ip: e.target.value})} 
                placeholder="e.g. 192.168.1.100" 
            />
          </div>
          <div>
            <label className="form-label" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Location</label>
            <input 
                type="text" 
                className="form-control" 
                value={newDevice.location} 
                onChange={(e) => setNewDevice({...newDevice, location: e.target.value})} 
                placeholder="e.g. Building A" 
            />
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default DeviceManagement;