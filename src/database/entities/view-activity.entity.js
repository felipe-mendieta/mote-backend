//id, count,
const mongoose = require('mongoose');
const emotion = require('./../../../utils/enums/emotion.enum')
const viewActivitySchema = new mongoose.Schema({
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

const ViewActivity = mongoose.model('ViewActivity', viewActivitySchema);
module.exports = {ViewActivity};
