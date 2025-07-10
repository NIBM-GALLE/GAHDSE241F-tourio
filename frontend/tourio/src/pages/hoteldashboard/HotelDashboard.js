import React from "react";
import { Link } from "react-router-dom";
import "./HotelDashboard.css";

const HotelDashboard = () => {
  const handleLogout = () => {
    console.log("Logging out...");
    // Add your logout functionality here
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Hotel Dashboard</h1>
        <p>Manage your tours here</p>
      </div>

      <div className="dashboard-grid">
        <Link to="/profile" className="dashboard-card">
          <div className="icon-container">
            <svg viewBox="0 0 24 24" className="dashboard-icon">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
            </svg>
          </div>
          <p>Your Profile</p>
        </Link>

        <Link to="/tourrequests" className="dashboard-card">
          <div className="icon-container">
            <svg viewBox="0 0 24 24" className="dashboard-icon">
              <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
            </svg>
          </div>
          <p>Find Tour Requests</p>
        </Link>

        <Link to="/tours" className="dashboard-card">
          <div className="icon-container">
            <svg viewBox="0 0 24 24" className="dashboard-icon">
              <path d="M12 2C8.14 2 5 5.14 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.86-3.14-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
            </svg>
          </div>
          <p>Your Tours</p>
        </Link>

        <Link to="/add-tour" className="dashboard-card">
          <div className="icon-container">
            <svg viewBox="0 0 24 24" className="dashboard-icon">
              <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
            </svg>
          </div>
          <p>Add New Tour</p>
        </Link>
      </div>

      <button className="logout-button" onClick={handleLogout}>
        <svg viewBox="0 0 24 24" className="logout-icon">
          <path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z" />
        </svg>
        Log out
      </button>
    </div>
  );
};

export default HotelDashboard;