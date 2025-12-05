import React, { useState } from 'react';

const doctors = [
  { id: 1, name: 'Dr. Sarah Johnson', specialty: 'Cardiologist', experience: '12 years', rating: 4.8 },
  { id: 2, name: 'Dr. Michael Chen', specialty: 'Dermatologist', experience: '8 years', rating: 4.7 },
  { id: 3, name: 'Dr. Emily Rodriguez', specialty: 'Pediatrician', experience: '15 years', rating: 4.9 },
  { id: 4, name: 'Dr. James Wilson', specialty: 'Orthopedic', experience: '10 years', rating: 4.6 },
  { id: 5, name: 'Dr. Lisa Anderson', specialty: 'Neurologist', experience: '14 years', rating: 4.8 },
  { id: 6, name: 'Dr. Robert Taylor', specialty: 'Cardiologist', experience: '20 years', rating: 4.9 }
];

function DoctorSearch({ showNotification }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredDoctors, setFilteredDoctors] = useState(doctors);
  const [bookedDoctors, setBookedDoctors] = useState([]);

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);

    const filtered = doctors.filter(doctor =>
      doctor.name.toLowerCase().includes(term) ||
      doctor.specialty.toLowerCase().includes(term)
    );
    setFilteredDoctors(filtered);
  };

  const handleBookAppointment = (doctor) => {
    if (bookedDoctors.includes(doctor.id)) {
      showNotification('info', `You already have an appointment with ${doctor.name}`);
    } else {
      setBookedDoctors([...bookedDoctors, doctor.id]);
      showNotification('success', `Appointment booked with ${doctor.name}!`);
    }
  };

  const handleCancelAppointment = (doctor) => {
    setBookedDoctors(bookedDoctors.filter(id => id !== doctor.id));
    showNotification('info', `Appointment with ${doctor.name} has been cancelled`);
  };

  return (
    <div>
      <h1 style={{color: '#00A896', marginBottom: '24px'}}>Find Doctors</h1>

      <div className="search-container">
        <div className="search-bar">
          <input
            type="text"
            className="search-input"
            placeholder="Search for doctors by name or specialty..."
            value={searchTerm}
            onChange={handleSearch}
          />
          <button className="btn btn-primary">Search</button>
        </div>
      </div>

      <div className="doctor-grid">
        {filteredDoctors.map(doctor => (
          <div key={doctor.id} className="doctor-card">
            <div className="doctor-image">
              {doctor.name.split(' ')[1].charAt(0)}
            </div>
            <div className="doctor-info">
              <h3>{doctor.name}</h3>
              <span className="specialty-badge">{doctor.specialty}</span>
              <div className="doctor-details">
                <div className="rating">⭐ {doctor.rating}/5</div>
                <div>Experience: {doctor.experience}</div>
              </div>
              {bookedDoctors.includes(doctor.id) ? (
                <button
                  className="btn btn-outline"
                  onClick={() => handleCancelAppointment(doctor)}
                  style={{width: '100%'}}
                >
                  Cancel Appointment
                </button>
              ) : (
                <button
                  className="btn btn-primary"
                  onClick={() => handleBookAppointment(doctor)}
                  style={{width: '100%'}}
                >
                  Book Appointment
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {filteredDoctors.length === 0 && (
        <div style={{textAlign: 'center', padding: '40px', color: '#666'}}>
          <p>No doctors found matching your search.</p>
        </div>
      )}
    </div>
  );
}

export default DoctorSearch;
