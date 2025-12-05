import React, { useState } from 'react';

function Login({ onLogin, showNotification }) {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validate()) {
      // Simulate successful login
      const userName = formData.email.split('@')[0]; // Use email prefix as name
      onLogin(userName.charAt(0).toUpperCase() + userName.slice(1));
      showNotification('success', 'Login successful! Welcome back.');
    } else {
      showNotification('error', 'Please enter valid credentials');
    }
  };

  return (
    <div className="form-container">
      <h2>Welcome Back</h2>
      <p style={{textAlign: 'center', color: '#666', marginBottom: '24px'}}>
        Login to continue to your account
      </p>

      <form onSubmit={handleSubmit}>
        <div className={`form-group ${errors.email ? 'error' : ''}`}>
          <label htmlFor="email">Email *</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="example@email.com"
          />
          {errors.email && <div className="error-message">{errors.email}</div>}
        </div>

        <div className={`form-group ${errors.password ? 'error' : ''}`}>
          <label htmlFor="password">Password *</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
          />
          {errors.password && <div className="error-message">{errors.password}</div>}
        </div>

        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px'}}>
          <label style={{display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer'}}>
            <input
              type="checkbox"
              name="rememberMe"
              checked={formData.rememberMe}
              onChange={handleChange}
            />
            <span style={{fontSize: '14px'}}>Remember me</span>
          </label>
          <a href="#forgot" style={{fontSize: '14px', color: '#00A896', textDecoration: 'none'}}>
            Forgot Password?
          </a>
        </div>

        <button type="submit" className="btn btn-primary" style={{width: '100%'}}>
          Login
        </button>

        <div className="form-link">
          Don't have an account? <a href="/signup">Sign Up</a>
        </div>
      </form>
    </div>
  );
}

export default Login;
