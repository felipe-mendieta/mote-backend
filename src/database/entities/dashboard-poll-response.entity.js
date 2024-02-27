const mongoose = require('mongoose');
const dashboardPollResponse = new mongoose.Schema({
  cognitive: {
    type: Number,
    required: true,
    default: 0,
  },
  emotional: {
    type: Number,
    required: true,
    default: 0,
  },
  behavioral: {
    type: Number,
    required: true,
    default: 0,
  },
  roomId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Room',
    required: true
  },
  createAt: {
    type: Date,
    default: Date.now
  },
  updateAt: {
    type: Date,
    default: Date.now
  },
});

const DashboardPollResponse = mongoose.model('DashboardPollResponse', dashboardPollResponse);
module.exports = { DashboardPollResponse };
