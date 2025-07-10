const express = require('express');
const router = express.Router();
const { sendTourProposal } = require('../controllers/tourProposalController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', authMiddleware, sendTourProposal);

module.exports = router;