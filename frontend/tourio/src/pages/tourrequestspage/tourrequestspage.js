import React from 'react';
import UserTourRequests from '../../components/UserTourRequests/UserTourRequests';

const TourRequestsPage = () => {
  return (
    <div>
      <h1 style={{ textAlign: 'center', marginTop: '30px' }}>Available Tour Requests</h1>
      <UserTourRequests />
    </div>
  );
};

export default TourRequestsPage;
