const express = require('express');
const router = express.Router();

const {DashboardEmotionsService} = require('../services/dashboard-emotions.service');
const dashboardEmotionsService = new DashboardEmotionsService();

// Ruta para obtener todas las emociones de dashboard
router.get('/', async (req, res, next) => {
  try {
    const dashboardEmotions = await dashboardEmotionsService.getAll();
    res.json(dashboardEmotions);
  } catch (error) {
    next(error);
  }
});

// Ruta para obtener una emoción de dashboard por roomId
router.get('/:roomId', async (req, res, next) => {
  const { roomId } = req.params;
  try {
    const dashboardEmotions = await dashboardEmotionsService.getById(roomId);
    res.json(dashboardEmotions);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
