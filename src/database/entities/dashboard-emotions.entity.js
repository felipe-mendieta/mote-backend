//id, count,
const mongoose = require('mongoose');
const emotion = require('../../../utils/enums/emotion.enum')
const dashboardEmotions = new mongoose.Schema({
  _id: {
    type: String,
    trim: true,
    required: true,
    enum: Object.values(emotion), // Valores permitidos para el tipo de actividad
  },
  count: {
    type: Number,
    trim: true,
    required: true,
  },
});

const DashboardEmotions = mongoose.model('DashboardEmotions', dashboardEmotions);
module.exports = {DashboardEmotions};
