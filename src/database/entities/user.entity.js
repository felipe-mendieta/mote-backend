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
    unique: 'Email already used!',
  },
  password: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
    trim: true,
    required: false,
  },
  gender: {
    type: String,
    trim: true,
    required: true,
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

//revisar el curso de Fernando Herrera para aclara el uso de esta función
userSchema.methods.toJSON = function () {
  // eslint-disable-next-line no-unused-vars
  const { __v, password, _id, ...user } = this.toObject();
  user.uid = _id;
  return user;
}

const User = mongoose.model('Users', userSchema);

module.exports = User;
