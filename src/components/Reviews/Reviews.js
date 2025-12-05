import React, { useState } from 'react';

const initialDoctors = [
  { id: 1, name: 'Dr. Sarah Johnson', specialty: 'Cardiologist', reviewed: false },
  { id: 2, name: 'Dr. Michael Chen', specialty: 'Dermatologist', reviewed: false },
  { id: 3, name: 'Dr. Emily Rodriguez', specialty: 'Pediatrician', reviewed: false }
];

function Reviews({ userName, showNotification }) {
  const [doctors, setDoctors] = useState(initialDoctors);
  const [showModal, setShowModal] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');

  const openReviewForm = (doctor) => {
    if (doctor.reviewed) {
      showNotification('info', 'You have already reviewed this doctor');
      return;
    }
    setSelectedDoctor(doctor);
    setShowModal(true);
    setRating(0);
    setFeedback('');
  };

  const handleSubmitReview = (e) => {
    e.preventDefault();

    if (rating === 0) {
      showNotification('error', 'Please select a rating');
      return;
    }

    if (!feedback.trim()) {
      showNotification('error', 'Please write your feedback');
      return;
    }

    // Update doctor as reviewed
    setDoctors(doctors.map(d =>
      d.id === selectedDoctor.id ? { ...d, reviewed: true } : d
    ));

    showNotification('success', `Thank you for reviewing ${selectedDoctor.name}!`);
    setShowModal(false);
    setSelectedDoctor(null);
  };

  return (
    <div className="reviews-container">
      <h2 style={{color: '#00A896', marginBottom: '8px'}}>Patient Reviews</h2>
      <p style={{color: '#666', marginBottom: '24px'}}>
        Share your consultation experience
      </p>

      <table className="reviews-table">
        <thead>
          <tr>
            <th>Doctor Name</th>
            <th>Specialty</th>
            <th>Action</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {doctors.map(doctor => (
            <tr key={doctor.id}>
              <td>
                <div style={{display: 'flex', alignItems: 'center', gap: '12px'}}>
                  <div style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #00A896, #02C39A)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontWeight: 'bold'
                  }}>
                    {doctor.name.split(' ')[1].charAt(0)}
                  </div>
                  {doctor.name}
                </div>
              </td>
              <td>
                <span className="specialty-badge">{doctor.specialty}</span>
              </td>
              <td>
                <button
                  className={`btn ${doctor.reviewed ? 'btn-disabled' : 'btn-primary'}`}
                  onClick={() => openReviewForm(doctor)}
                  disabled={doctor.reviewed}
                  style={{fontSize: '14px', padding: '8px 16px'}}
                >
                  Give Feedback
                </button>
              </td>
              <td>
                {doctor.reviewed ? (
                  <span className="status-badge status-reviewed">✓ Reviewed</span>
                ) : (
                  <span className="status-badge status-pending">Pending</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Review Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3 style={{color: '#00A896', marginBottom: '16px'}}>
              Review {selectedDoctor?.name}
            </h3>

            <form onSubmit={handleSubmitReview}>
              <div className="form-group">
                <label>Patient Name</label>
                <input
                  type="text"
                  value={userName || 'Anonymous'}
                  disabled
                  style={{background: '#f8f9fa'}}
                />
              </div>

              <div className="form-group">
                <label>Rating *</label>
                <div className="star-rating">
                  {[1, 2, 3, 4, 5].map(star => (
                    <span
                      key={star}
                      className={`star ${star <= rating ? 'filled' : ''}`}
                      onClick={() => setRating(star)}
                    >
                      ★
                    </span>
                  ))}
                </div>
              </div>

              <div className="form-group">
                <label>Share your experience *</label>
                <textarea
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  rows="5"
                  placeholder="Write your feedback here..."
                />
              </div>

              <div style={{display: 'flex', gap: '12px', marginTop: '20px'}}>
                <button type="submit" className="btn btn-primary" style={{flex: 1}}>
                  Submit Review
                </button>
                <button
                  type="button"
                  className="btn btn-outline"
                  onClick={() => setShowModal(false)}
                  style={{flex: 1}}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Reviews;
