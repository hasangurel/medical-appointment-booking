import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import SignUp from './components/SignUp/SignUp';
import Login from './components/Login/Login';
import DoctorSearch from './components/AppointmentBooking/DoctorSearch';
import InstantConsultation from './components/InstantConsultation/InstantConsultation';
import Reviews from './components/Reviews/Reviews';
import Profile from './components/Profile/Profile';
import Notification from './components/Notification/Notification';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const [notification, setNotification] = useState(null);

  const handleLogin = (name) => {
    setIsLoggedIn(true);
    setUserName(name);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserName('');
    setNotification({ type: 'info', message: 'You have been logged out successfully' });
    setTimeout(() => setNotification(null), 3000);
  };

  const showNotification = (type, message) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 5000);
  };

  return (
    <Router>
      <div className="App">
        {/* Navigation Bar */}
        <nav className="navbar">
          <div className="nav-container">
            <div className="logo">
              <div className="logo-icon">+</div>
              <span className="logo-text">StayHealthy</span>
            </div>

            <ul className="nav-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/appointments">Appointments</Link></li>
              <li><Link to="/reviews">Reviews</Link></li>
              <li><Link to="/instant-consultation">Instant Consultation</Link></li>
            </ul>

            <div className="nav-actions">
              {isLoggedIn ? (
                <>
                  <Link to="/profile" className="user-name">Welcome, {userName}</Link>
                  <button className="btn btn-outline" onClick={handleLogout}>
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link to="/signup" className="btn btn-outline">Sign Up</Link>
                  <Link to="/login" className="btn btn-primary">Login</Link>
                </>
              )}
            </div>
          </div>
        </nav>

        {/* Notification Component */}
        {notification && (
          <Notification
            type={notification.type}
            message={notification.message}
            onClose={() => setNotification(null)}
          />
        )}

        {/* Routes */}
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<SignUp onSignUp={handleLogin} showNotification={showNotification} />} />
            <Route path="/login" element={<Login onLogin={handleLogin} showNotification={showNotification} />} />
            <Route path="/appointments" element={<DoctorSearch showNotification={showNotification} />} />
            <Route path="/instant-consultation" element={<InstantConsultation />} />
            <Route path="/reviews" element={<Reviews userName={userName} showNotification={showNotification} />} />
            <Route path="/profile" element={<Profile userName={userName} setUserName={setUserName} showNotification={showNotification} />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

// Home Component
function Home() {
  return (
    <div className="home-container">
      <div className="hero-section">
        <h1>Your Health, Our Priority</h1>
        <p>Book appointments with top doctors instantly</p>
        <div className="hero-buttons">
          <Link to="/appointments" className="btn btn-primary btn-large">
            Find Doctors
          </Link>
          <Link to="/instant-consultation" className="btn btn-outline btn-large">
            Instant Consultation
          </Link>
        </div>
      </div>

      <div className="features">
        <div className="feature-card">
          <div className="feature-icon">📅</div>
          <h3>Easy Booking</h3>
          <p>Book appointments with verified doctors in seconds</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">💬</div>
          <h3>Instant Consultation</h3>
          <p>Get immediate medical advice through video calls</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">⭐</div>
          <h3>Reviews & Ratings</h3>
          <p>Read reviews from verified patients</p>
        </div>
      </div>
    </div>
  );
}

export default App;
