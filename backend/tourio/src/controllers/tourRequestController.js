const db = require('../services/firebaseService');

const getTourRequests = async (req, res) => {
  try {
    const snapshot = await db.collection('TourRequests').get();
    const tourRequests = [];

    snapshot.forEach(doc => {
      const data = doc.data();
      tourRequests.push({
        title: data.tourTitle,
        destination1: data.destination1,
        destination2: data.destination2,
        destination3: data.destination3,
        destination4: data.destination4,
        destination5: data.destination5,
        budget: data.acceptedBudget,
        tourReqId: data.tourReqId,
        userId: data.userId,
      });
    });

    res.status(200).json(tourRequests);
  } catch (error) {
    console.error('Error fetching tour requests:', error);
    res.status(500).json({ message: 'Failed to fetch tour requests' });
  }
};

module.exports = { getTourRequests };
