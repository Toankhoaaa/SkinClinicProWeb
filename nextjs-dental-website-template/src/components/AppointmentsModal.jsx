import React from 'react';
import { useAuth } from '../context/AuthContext';

/**
 * Appointments Modal Component
 * Displays user appointments with mockdata
 */
const AppointmentsModal = () => {
  const { isAppointmentsOpen, closeAppointments, user } = useAuth();

  if (!isAppointmentsOpen || !user) return null;

  const appointments = [
    {
      id: 1,
      service: 'Acne Treatment',
      doctor: 'Dr. Sarah Johnson',
      date: '2025-12-05',
      time: '10:00 AM',
      status: 'Confirmed',
    },
    {
      id: 2,
      service: 'Skin Consultation',
      doctor: 'Dr. Michael Chen',
      date: '2025-12-12',
      time: '2:30 PM',
      status: 'Pending',
    },
    {
      id: 3,
      service: 'Laser Therapy',
      doctor: 'Dr. Emily Rodriguez',
      date: '2025-11-28',
      time: '3:00 PM',
      status: 'Completed',
    },
  ];

  const getStatusBadge = (status) => {
    const badgeClass =
      status === 'Confirmed'
        ? 'bg-success'
        : status === 'Pending'
          ? 'bg-warning'
          : 'bg-secondary';
    return (
      <span className={`badge ${badgeClass}`} style={{ fontSize: '11px' }}>
        {status}
      </span>
    );
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="modal-backdrop fade show"
        onClick={closeAppointments}
        style={{ display: 'block' }}
      />

      {/* Modal */}
      <div
        className="modal fade show"
        style={{ display: 'block' }}
        tabIndex="-1"
        role="dialog"
        aria-labelledby="appointmentsModalLabel"
        aria-hidden="false"
      >
        <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
          <div className="modal-content">
            {/* Header */}
            <div className="modal-header bg-color text-white border-0">
              <h5 className="modal-title" id="appointmentsModalLabel">
                My Appointments
              </h5>
              <button
                type="button"
                className="btn-close btn-close-white"
                onClick={closeAppointments}
                aria-label="Close"
              />
            </div>

            {/* Body */}
            <div className="modal-body p-4">
              {appointments.length === 0 ? (
                <div className="text-center py-5">
                  <i
                    className="uil uil-calendar-alt"
                    style={{ fontSize: '48px', color: '#ccc', marginBottom: '16px' }}
                  />
                  <p className="text-muted">No appointments scheduled</p>
                </div>
              ) : (
                <div className="appointment-list">
                  {appointments.map((appointment) => (
                    <div
                      key={appointment.id}
                      className="border rounded p-3 mb-3"
                      style={{ background: '#f9f9f9' }}
                    >
                      <div className="d-flex justify-content-between align-items-start mb-2">
                        <div>
                          <h6 className="mb-1">{appointment.service}</h6>
                          <p className="text-muted mb-2" style={{ fontSize: '13px' }}>
                            <i className="uil uil-user me-1" />
                            {appointment.doctor}
                          </p>
                        </div>
                        {getStatusBadge(appointment.status)}
                      </div>
                      <div className="d-flex gap-3" style={{ fontSize: '13px' }}>
                        <span>
                          <i className="uil uil-calendar-alt me-1" style={{ color: '#003366' }} />
                          {appointment.date}
                        </span>
                        <span>
                          <i className="uil uil-clock-eight me-1" style={{ color: '#003366' }} />
                          {appointment.time}
                        </span>
                      </div>
                      {appointment.status === 'Confirmed' && (
                        <div className="mt-2 d-flex gap-2">
                          <button className="btn btn-sm btn-outline-dark rounded" style={{ fontSize: '12px' }}>
                            Reschedule
                          </button>
                          <button className="btn btn-sm btn-outline-danger rounded" style={{ fontSize: '12px' }}>
                            Cancel
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* Action Button */}
              <div className="d-flex gap-2 mt-4">
                <button className="btn bg-color text-white flex-grow-1 rounded border-0">
                  Book New Appointment
                </button>
                <button
                  className="btn btn-outline-secondary flex-grow-1 rounded border-0"
                  onClick={closeAppointments}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AppointmentsModal;
