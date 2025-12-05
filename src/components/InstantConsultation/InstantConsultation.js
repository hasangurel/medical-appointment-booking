import React, { useState } from 'react';

function InstantConsultation() {
  const [chatMessages, setChatMessages] = useState([
    { sender: 'doctor', text: 'Hello! How can I help you today?' }
  ]);
  const [message, setMessage] = useState('');

  const handleSendMessage = () => {
    if (message.trim()) {
      setChatMessages([...chatMessages, { sender: 'patient', text: message }]);
      setMessage('');

      // Simulate doctor response
      setTimeout(() => {
        setChatMessages(prev => [...prev, {
          sender: 'doctor',
          text: 'Thank you for sharing. Let me review your symptoms.'
        }]);
      }, 1000);
    }
  };

  return (
    <div className="consultation-container">
      <h2 style={{color: '#00A896', marginBottom: '24px'}}>Instant Consultation</h2>

      <div className="consultation-info">
        <div style={{display: 'flex', alignItems: 'center', gap: '16px'}}>
          <div style={{
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #00A896, #02C39A)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontSize: '24px'
          }}>
            Dr
          </div>
          <div>
            <h3 style={{marginBottom: '4px'}}>Dr. John Smith</h3>
            <p style={{color: '#666', fontSize: '14px'}}>General Physician</p>
            <span style={{
              display: 'inline-block',
              background: '#28a745',
              color: 'white',
              padding: '4px 12px',
              borderRadius: '12px',
              fontSize: '12px',
              marginTop: '4px'
            }}>
              ● Available Now
            </span>
          </div>
        </div>
      </div>

      <div className="video-container">
        📹
        <p style={{marginTop: '16px', fontSize: '16px'}}>Video Call Placeholder</p>
      </div>

      <h3 style={{marginBottom: '12px'}}>Chat</h3>
      <div className="chat-box">
        {chatMessages.map((msg, index) => (
          <div
            key={index}
            style={{
              marginBottom: '12px',
              textAlign: msg.sender === 'patient' ? 'right' : 'left'
            }}
          >
            <div
              style={{
                display: 'inline-block',
                background: msg.sender === 'patient' ? '#00A896' : '#e0e0e0',
                color: msg.sender === 'patient' ? 'white' : '#333',
                padding: '8px 16px',
                borderRadius: '16px',
                maxWidth: '70%'
              }}
            >
              {msg.text}
            </div>
          </div>
        ))}
      </div>

      <div className="chat-input-container">
        <input
          type="text"
          className="chat-input"
          placeholder="Type your message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
        />
        <button className="btn btn-primary" onClick={handleSendMessage}>
          Send
        </button>
      </div>
    </div>
  );
}

export default InstantConsultation;
