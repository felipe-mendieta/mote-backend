const mongoose = require('mongoose');

const recordActivitySchema = new mongoose.Schema({
  activityType: {
    type: String,
    enum: ['Sueño', "No entiendo"], // Valores permitidos para el tipo de actividad
    required: true,
  },
  recordDate: {
    type: Date,
    default: Date.now, // Valor predeterminado para la fecha de registro
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users', // Nombre de la colección de estudiantes relacionada
  },
});

const RecordActivity = mongoose.model('RecordActivity', recordActivitySchema);

module.exports = RecordActivity;
