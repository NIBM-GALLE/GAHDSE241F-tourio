import React, { useEffect, useState } from 'react';
import './UserTourRequests.css';
import axios from 'axios';

const UserTourRequests = () => {
  const [tourRequests, setTourRequests] = useState([]);
  const [proposals, setProposals] = useState({});

  useEffect(() => {
    const fetchTourRequests = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/tourreq');
        setTourRequests(response.data);
      } catch (error) {
        console.error('Failed to fetch tour requests:', error);
      }
    };

    fetchTourRequests();
  }, []);

  const handleProposalChange = (id, field, value) => {
    setProposals(prev => ({
      ...prev,
      [id]: {
        ...prev[id],
        [field]: value
      }
    }));
  };

  const handleSendProposal = (tourReqId, userId) => {
    const proposalData = proposals[tourReqId];
    console.log('Send Proposal:', { tourReqId, userId, ...proposalData });
    
  };

  return (
    <div className="tour-requests-container">
      {tourRequests.map(req => (
        <div key={req.tourReqId} className="tour-card">
          <h2>{req.title}</h2>
          <ul>
            {[1, 2, 3, 4, 5].map(i => req[`destination${i}`] && (
              <li key={i}>{req[`destination${i}`]}</li>
            ))}
          </ul>
          <p><strong>Expected Budget:</strong> Rs. {req.budget || 'Not mentioned'}</p>

          <textarea
            placeholder="Type your proposal"
            value={proposals[req.tourReqId]?.text || ''}
            onChange={(e) =>
              handleProposalChange(req.tourReqId, 'text', e.target.value)
            }
          />
          <input
            type="number"
            placeholder="Enter your offer"
            value={proposals[req.tourReqId]?.budget || ''}
            onChange={(e) =>
              handleProposalChange(req.tourReqId, 'budget', e.target.value)
            }
          />
          <button
            onClick={() => handleSendProposal(req.tourReqId, req.userId)}
          >
            Send Proposal
          </button>
        </div>
      ))}
    </div>
  );
};

export default UserTourRequests;
