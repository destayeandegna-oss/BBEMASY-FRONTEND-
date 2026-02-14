import React, { useState, useEffect } from 'react';
import { FiMapPin, FiClock, FiCheckCircle, FiXCircle, FiAlertTriangle } from 'react-icons/fi';
import toast, { Toaster } from 'react-hot-toast';

const CheckInOut = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [location, setLocation] = useState(null);
  const [status, setStatus] = useState('out'); // 'in' or 'out'
  const [loading, setLoading] = useState(false);
  const [locationError, setLocationError] = useState(null);
  const [attendanceRecord, setAttendanceRecord] = useState(null);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const getLocation = () => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject('Geolocation is not supported by your browser');
      } else {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            resolve({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
              accuracy: position.coords.accuracy
            });
          },
          (error) => {
            let errorMessage = 'Unable to retrieve your location';
            if (error.code === 1) errorMessage = 'Location permission denied';
            else if (error.code === 2) errorMessage = 'Location unavailable';
            else if (error.code === 3) errorMessage = 'Location request timed out';
            reject(errorMessage);
          },
          { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
        );
      }
    });
  };

  const handleCheckIn = async () => {
    setLoading(true);
    setLocationError(null);
    try {
      const loc = await getLocation();
      setLocation(loc);
      
      // Simulate API call
      setTimeout(() => {
        const record = {
          checkInTime: new Date(),
          location: loc,
          status: 'Present'
        };
        setAttendanceRecord(record);
        setStatus('in');
        toast.success('Checked in successfully!');
        setLoading(false);
      }, 1500);
    } catch (error) {
      setLocationError(error);
      toast.error('Check-in failed: ' + error);
      setLoading(false);
    }
  };

  const handleCheckOut = async () => {
    setLoading(true);
    setLocationError(null);
    try {
      const loc = await getLocation();
      setLocation(loc);
      
      // Simulate API call
      setTimeout(() => {
        setAttendanceRecord(prev => ({
          ...prev,
          checkOutTime: new Date()
        }));
        setStatus('out');
        toast.success('Checked out successfully!');
        setLoading(false);
      }, 1500);
    } catch (error) {
      setLocationError(error);
      toast.error('Check-out failed: ' + error);
      setLoading(false);
    }
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString([], { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <Toaster position="top-right" />
      <h1 style={{ marginBottom: '30px' }}>Daily Attendance</h1>

      <div style={{ 
        background: 'white', 
        borderRadius: '15px', 
        padding: '40px', 
        boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
        textAlign: 'center',
        marginBottom: '30px'
      }}>
        <div style={{ marginBottom: '20px', color: '#666' }}>
          <FiClock size={24} style={{ verticalAlign: 'middle', marginRight: '10px' }} />
          <span style={{ fontSize: '18px', verticalAlign: 'middle' }}>{formatDate(currentTime)}</span>
        </div>
        
        <div style={{ fontSize: '64px', fontWeight: 'bold', color: '#1a237e', marginBottom: '40px', fontFamily: 'monospace' }}>
          {formatTime(currentTime)}
        </div>

        {locationError && (
          <div style={{ 
            background: '#ffebee', 
            color: '#c62828', 
            padding: '15px', 
            borderRadius: '8px', 
            marginBottom: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px'
          }}>
            <FiAlertTriangle />
            {locationError}
          </div>
        )}

        <div style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
          <button 
            className="btn"
            style={{ 
              background: status === 'out' ? '#28a745' : '#e0e0e0',
              color: status === 'out' ? 'white' : '#999',
              padding: '15px 40px',
              fontSize: '18px',
              borderRadius: '30px',
              cursor: status === 'out' ? 'pointer' : 'not-allowed',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              boxShadow: status === 'out' ? '0 4px 10px rgba(40, 167, 69, 0.3)' : 'none'
            }}
            onClick={handleCheckIn}
            disabled={status === 'in' || loading}
          >
            {loading && status === 'out' ? 'Processing...' : <><FiCheckCircle /> Check In</>}
          </button>

          <button 
            className="btn"
            style={{ 
              background: status === 'in' ? '#dc3545' : '#e0e0e0',
              color: status === 'in' ? 'white' : '#999',
              padding: '15px 40px',
              fontSize: '18px',
              borderRadius: '30px',
              cursor: status === 'in' ? 'pointer' : 'not-allowed',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              boxShadow: status === 'in' ? '0 4px 10px rgba(220, 53, 69, 0.3)' : 'none'
            }}
            onClick={handleCheckOut}
            disabled={status === 'out' || loading}
          >
            {loading && status === 'in' ? 'Processing...' : <><FiXCircle /> Check Out</>}
          </button>
        </div>

        {location && (
          <div style={{ marginTop: '30px', color: '#666', fontSize: '14px' }}>
            <p><FiMapPin style={{ verticalAlign: 'middle' }} /> Location detected: {location.latitude.toFixed(6)}, {location.longitude.toFixed(6)}</p>
            <p style={{ fontSize: '12px', opacity: 0.7 }}>(Accuracy: {location.accuracy.toFixed(1)} meters)</p>
          </div>
        )}
      </div>

      {attendanceRecord && (
        <div className="table-container">
          <h3>Today's Activity</h3>
          <table>
            <thead>
              <tr>
                <th>Activity</th>
                <th>Time</th>
                <th>Location</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><span className="badge badge-success">Check In</span></td>
                <td>{formatTime(attendanceRecord.checkInTime)}</td>
                <td>{attendanceRecord.location.latitude.toFixed(4)}, {attendanceRecord.location.longitude.toFixed(4)}</td>
              </tr>
              {attendanceRecord.checkOutTime && (
                <tr>
                  <td><span className="badge badge-danger">Check Out</span></td>
                  <td>{formatTime(attendanceRecord.checkOutTime)}</td>
                  <td>{location ? `${location.latitude.toFixed(4)}, ${location.longitude.toFixed(4)}` : '-'}</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default CheckInOut;