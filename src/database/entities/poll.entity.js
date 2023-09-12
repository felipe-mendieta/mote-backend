const mongoose = require('mongoose');

const pollSchema = new mongoose.Schema({
  pollTitle: {
    type: String,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
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
