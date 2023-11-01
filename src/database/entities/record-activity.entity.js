const mongoose = require('mongoose');
const activity = require('./../../../utils/enums/activity.enum')
const recordActivitySchema = new mongoose.Schema({
  activityType: {
    type: String,
    enum: Object.values(activity), // Valores permitidos para el tipo de actividad
    required: true,
  },
  recordDate: {
    type: Date,
    default: Date.now, // Valor predeterminado para la fecha de registro
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Nombre de la colección de estudiantes relacionada
  },
  roomId:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Room', // Nombre de la colección de estudiantes relacionada
  }
});

const RecordActivity = mongoose.model('RecordActivity', recordActivitySchema);

module.exports = RecordActivity;
