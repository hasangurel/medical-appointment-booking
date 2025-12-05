import React, { useState } from 'react';

function Profile({ userName, setUserName, showNotification }) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: userName || 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 234 567 8900',
    address: '123 Health Street, Medical City, MC 12345'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    setUserName(formData.name);
    setIsEditing(false);
    showNotification('success', 'Profile updated successfully!');
  };

  const handleCancel = () => {
    setFormData({
      name: userName || 'John Doe',
      email: 'john.doe@example.com',
      phone: '+1 234 567 8900',
      address: '123 Health Street, Medical City, MC 12345'
    });
    setIsEditing(false);
  };

  return (
    <div className="profile-container">
      <div className="profile-header">
        <div className="profile-avatar">
          {(formData.name || 'J').charAt(0).toUpperCase()}
        </div>
        <h2 style={{color: '#00A896', marginBottom: '8px'}}>{formData.name}</h2>
        <p style={{color: '#666'}}>Patient</p>
      </div>

      <div style={{marginBottom: '24px'}}>
        <div className="form-group">
          <label>Full Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            disabled={!isEditing}
            style={{background: isEditing ? 'white' : '#f8f9fa'}}
          />
        </div>

        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            disabled={!isEditing}
            style={{background: isEditing ? 'white' : '#f8f9fa'}}
          />
        </div>

        <div className="form-group">
          <label>Phone</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            disabled={!isEditing}
            style={{background: isEditing ? 'white' : '#f8f9fa'}}
          />
        </div>

        <div className="form-group">
          <label>Address</label>
          <textarea
            name="address"
            value={formData.address}
            onChange={handleChange}
            disabled={!isEditing}
            rows="3"
            style={{background: isEditing ? 'white' : '#f8f9fa'}}
          />
        </div>
      </div>

      <div style={{display: 'flex', gap: '12px'}}>
        {!isEditing ? (
          <button
            className="btn btn-primary"
            onClick={() => setIsEditing(true)}
            style={{flex: 1}}
          >
            Edit Profile
          </button>
        ) : (
          <>
            <button
              className="btn btn-primary"
              onClick={handleSave}
              style={{flex: 1}}
            >
              Save Changes
            </button>
            <button
              className="btn btn-outline"
              onClick={handleCancel}
              style={{flex: 1}}
            >
              Cancel
            </button>
          </>
        )}
      </div>

      <div style={{marginTop: '32px', paddingTop: '32px', borderTop: '1px solid #e0e0e0'}}>
        <h3 style={{color: '#00A896', marginBottom: '16px'}}>Medical Reports</h3>
        <div style={{background: '#f8f9fa', padding: '16px', borderRadius: '8px'}}>
          <p style={{color: '#666', fontSize: '14px'}}>
            📄 No medical reports available yet
          </p>
        </div>
      </div>
    </div>
  );
}

export default Profile;
