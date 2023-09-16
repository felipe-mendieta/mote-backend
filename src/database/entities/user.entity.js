const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true,
  },
  email: {
    type: String,
    trim: true,
    required: true,
    unique: [true,'Email already used!'],
  },
  password: {
    type: String,
  },
  avatar: {
    type: String,
    trim: true,
    required: false,
  },
  gender: {
    type: String,
    trim: true,
  },
  rol: {
    type: String,
    required: true,
    trim: true,
    default: 'USER_ROLE',
    emun: ['ADMIN_ROLE', 'USER_ROLE']
  },
  status: {
    type: Boolean,
    default: true
  },
  google: {
    type: Boolean,
    default: false
  }
});


const User = mongoose.model('Users', userSchema);

module.exports = User;
