import React from 'react';

function Notification({ type, message, onClose }) {
  return (
    <div className={`notification ${type}`}>
      <span>{message}</span>
      <button className="notification-close" onClick={onClose}>
        ×
      </button>
    </div>
  );
}

export default Notification;
