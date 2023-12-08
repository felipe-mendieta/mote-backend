//id, count,
const mongoose = require('mongoose');

const dashboardEmotions = new mongoose.Schema({
  surprised: {
    type: Number,
    required: true,
    default: 0
  },
  afraid: {
    type: Number,
    required: true,
    default: 0
  },
  angry: {
    type: Number,
    required: true,
    default: 0
  },
  sad: {
    type: Number,
    required: true,
    default: 0
  },
  happy: {
    type: Number,
    required: true,
    default: 0
  },
  roomId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Room',
    required: true
  }
});

const DashboardEmotions = mongoose.model('DashboardEmotions', dashboardEmotions);
module.exports = { DashboardEmotions };
