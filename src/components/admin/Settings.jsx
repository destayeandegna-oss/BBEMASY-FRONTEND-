import React, { useState } from 'react';
import Card from '../common/Card';
import { FiSave } from 'react-icons/fi';
import toast, { Toaster } from 'react-hot-toast';

const Settings = () => {
  const [settings, setSettings] = useState({
    systemName: 'BBEMSS - HU-IOT',
    timezone: 'Africa/Addis_Ababa',
    dateFormat: 'DD/MM/YYYY',
    maintenanceMode: false,
    emailNotifications: true,
    biometricThreshold: 80
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings({
      ...settings,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSave = () => {
    toast.loading('Saving settings...', { id: 'save' });
    setTimeout(() => {
      toast.success('Settings saved successfully', { id: 'save' });
      // In a real app, this would make an API call
    }, 1000);
  };

  return (
    <div>
      <Toaster position="top-right" />
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <h2 style={{ margin: 0, fontWeight: 700, fontSize: '1.5rem' }}>System Settings</h2>
          <p style={{ margin: '4px 0 0', color: 'var(--text-secondary)' }}>Configure global application preferences.</p>
        </div>
        <button className="btn btn-primary" onClick={handleSave}>
          <FiSave style={{ marginRight: '5px' }} /> Save Changes
        </button>
      </div>

      <div className="dashboard-grid" style={{ gridTemplateColumns: '1fr 1fr' }}>
        <Card title="General Settings">
          <div className="form-group">
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>System Name</label>
            <input
              type="text"
              className="form-control"
              name="systemName"
              value={settings.systemName}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Timezone</label>
            <select
              className="form-control"
              name="timezone"
              value={settings.timezone}
              onChange={handleChange}
            >
              <option value="Africa/Addis_Ababa">Africa/Addis_Ababa (EAT)</option>
              <option value="UTC">UTC</option>
              <option value="America/New_York">America/New_York (EST)</option>
            </select>
          </div>
          <div className="form-group">
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Date Format</label>
            <select
              className="form-control"
              name="dateFormat"
              value={settings.dateFormat}
              onChange={handleChange}
            >
              <option value="DD/MM/YYYY">DD/MM/YYYY</option>
              <option value="MM/DD/YYYY">MM/DD/YYYY</option>
              <option value="YYYY-MM-DD">YYYY-MM-DD</option>
            </select>
          </div>
        </Card>

        <Card title="Biometric Configuration">
          <div className="form-group">
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Matching Threshold (%)</label>
            <input
              type="number"
              className="form-control"
              name="biometricThreshold"
              value={settings.biometricThreshold}
              onChange={handleChange}
              min="0"
              max="100"
            />
            <small style={{ color: 'var(--text-secondary)' }}>Minimum confidence score for a successful match.</small>
          </div>
        </Card>

        <Card title="Notifications & Alerts">
           <div className="form-group" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <input
              type="checkbox"
              id="emailNotifications"
              name="emailNotifications"
              checked={settings.emailNotifications}
              onChange={handleChange}
              style={{ width: '18px', height: '18px' }}
            />
            <label htmlFor="emailNotifications" style={{ margin: 0, cursor: 'pointer' }}>Enable Email Notifications</label>
          </div>
        </Card>

        <Card title="System Maintenance">
          <div className="form-group" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <input
              type="checkbox"
              id="maintenanceMode"
              name="maintenanceMode"
              checked={settings.maintenanceMode}
              onChange={handleChange}
              style={{ width: '18px', height: '18px' }}
            />
            <label htmlFor="maintenanceMode" style={{ margin: 0, cursor: 'pointer' }}>Enable Maintenance Mode</label>
          </div>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '10px' }}>
            When enabled, only administrators can access the system.
          </p>
        </Card>
      </div>
    </div>
  );
};

export default Settings;