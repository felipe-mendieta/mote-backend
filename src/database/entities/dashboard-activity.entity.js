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
// {
//   "activity": "login",
//   "count": 10,
//   "roomId": "60aebd6c8e1c6a0015e7a8d2",
//   "updateAt": "2021-06-01T12:00:00Z",
//   "historial": [5, 8, 12, 15]
// }
