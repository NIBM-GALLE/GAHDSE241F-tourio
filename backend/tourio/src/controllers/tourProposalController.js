const db = require('../services/firebaseService');

exports.sendTourProposal = async (req, res) => {
  try {
    const {
      tourReqId,
      proposalText,
      proposedBudget,
      destination_1,
      destination_2,
      destination_3,
      destination_4,
      destination_5
    } = req.body;

    const hotelUserId = req.user.uid;

    //if (!tourReqId || !proposalText || !proposedBudget) {
    //  return res.status(400).json({ message: 'Missing required fields' });
    //}

    const proposalRef = db.collection('TourReqProposals').doc();

    await proposalRef.set({
      proposalId: proposalRef.id,
      tourReqId,
      proposalText,
      proposedBudget,
      destination_1: destination_1 || null,
      destination_2: destination_2 || null,
      destination_3: destination_3 || null,
      destination_4: destination_4 || null,
      destination_5: destination_5 || null,
      hotelUserId,
      timestamp: new Date().toISOString()
    });

    res.status(201).json({ message: 'Proposal sent successfully' });
  } catch (error) {
    console.error('Error sending proposal:', error);
    res.status(500).json({ message: 'Failed to send proposal' });
  }
};
