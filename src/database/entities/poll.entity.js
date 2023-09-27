const mongoose = require('mongoose');

const pollSchema = new mongoose.Schema({
  pollTitle: {
    type: String,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
    default: Date.now,
  },
  endDate: {
    type: Date,
  },
  questions: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Question'
    },
  ],
});

const Poll = mongoose.model('Poll', pollSchema);

module.exports = Poll;
