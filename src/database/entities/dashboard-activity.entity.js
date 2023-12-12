const mongoose = require('mongoose');
const activity = require('./../../../utils/enums/activity.enum');
const dashboardActivity = new mongoose.Schema({
  activity: {
    type: String,
    required: true,
    enum: Object.values(activity),
  },
  count: {
    type: Number,
    required: true,
    default: 0
  },
  roomId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Room',
    required: true
  },
  updateAt: {
    type: Date,
    default: Date.now
  },
  //create an historial array variable for numbers
  historial: [
    {
      type: Number,
      default: 0
    }
  ]
});

const DashboardActivity = mongoose.model('DashboardActivity', dashboardActivity);
module.exports = { DashboardActivity };
