const express = require('express');
const router = express.Router();

// Import the DashboardPollResponseService
const { DashboardPollResponseService } = require('../services/dashboard-poll-response.service');
const dashboardPollResponseService = new DashboardPollResponseService();

// Route to get a poll response by roomId
router.get('/:roomId', async (req, res, next) => {
  const { roomId } = req.params;
  try {
    const dashboardPollResponse = await dashboardPollResponseService.getById(roomId);
    res.json(dashboardPollResponse);
  } catch (error) {
    next(error);
  }
});


module.exports = router;
