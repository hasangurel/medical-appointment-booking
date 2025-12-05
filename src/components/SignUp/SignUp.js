import React, { useState } from 'react';

function SignUp({ onSignUp, showNotification }) {
  const [formData, setFormData] = useState({
    role: '',
    name: '',
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};

    if (!formData.role) {
      newErrors.role = 'Please select a role';
    }

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validate()) {
      // Success
      onSignUp(formData.name);
      showNotification('success', 'Account created successfully! Welcome to StayHealthy.');

      // Reset form
      setFormData({ role: '', name: '', email: '', password: '' });
    } else {
      showNotification('error', 'Please fix the errors in the form');
    }
  };

  return (
    <div className="form-container">
      <h2>Create Account</h2>
      <form onSubmit={handleSubmit}>
        <div className={`form-group ${errors.role ? 'error' : ''}`}>
          <label htmlFor="role">Role *</label>
          <select
            id="role"
            name="role"
            value={formData.role}
            onChange={handleChange}
          >
            <option value="">Select Role</option>
            <option value="patient">Patient</option>
            <option value="doctor">Doctor</option>
            <option value="admin">Admin</option>
          </select>
          {errors.role && <div className="error-message">{errors.role}</div>}
        </div>

        <div className={`form-group ${errors.name ? 'error' : ''}`}>
          <label htmlFor="name">Full Name *</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your full name"
          />
          {errors.name && <div className="error-message">{errors.name}</div>}
        </div>

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
            placeholder="At least 8 characters"
          />
          {errors.password && <div className="error-message">{errors.password}</div>}
        </div>

        <button type="submit" className="btn btn-primary" style={{width: '100%', marginTop: '12px'}}>
          Sign Up
        </button>

        <div className="form-link">
          Already have an account? <a href="/login">Login</a>
        </div>
      </form>
    </div>
  );
}

export default SignUp;
