//create a router for dashboard activity
const express = require('express');
const router = express.Router();
const {DashboardActivityService} = require('../services/dashboard-activity.service');

const dashboardActivityService = new DashboardActivityService();

// Ruta para obtener todas las actividades de dashboard
router.get('/', async (req, res, next) => {
  try {
    const dashboardActivity = await dashboardActivityService.getAll();
    res.json(dashboardActivity);
  } catch (error) {
    next(error);
  }
});
//router for clean intervals
router.get('/clearIntervals', async (req, res, next) => {
  try {
    //wait to all promises to resolve
    dashboardActivityService.clearAllIntervals();
    res.json({ message: 'Intervals cleared.' });
  } catch (error) {
    next(error);
  }
});
// Ruta para obtener una actividad de dashboard por roomId
router.get('/:roomId', async (req, res, next) => {
  const { roomId } = req.params;
  try {
    const dashboardActivity = await dashboardActivityService.getById(roomId);
    res.json(dashboardActivity);
  } catch (error) {
    next(error);
  }
});


module.exports = router;
