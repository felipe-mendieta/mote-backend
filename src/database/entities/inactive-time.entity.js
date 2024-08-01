const mongoose = require('mongoose');
const inactiveTimeSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    unique: [true, 'Uid already used!'],
  },
  intervalId:{
    type: Number,
    required: true
  },
  lastActivity: {
    type: Date,
    required: true,
  },
  inactiveTime: {
    type: Number,
    required: true,
    default: 0
  }
})
const InactiveTime = mongoose.model('InactiveTime', inactiveTimeSchema);

module.exports = InactiveTime;
