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
    unique: [true, 'Email already used!'],
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
  },
  idGoogle: {
    type: String,
    trim: true,
  }
});
//quitamos la contraseña hasheada al devolver la información del usuario y cambios el nombre de _id por uid(user id)
//quitamos __v
userSchema.methods.toJSON = function () {
  // eslint-disable-next-line no-unused-vars
  const { __v, password, _id, ...user } = this.toObject();
  return user;
}

const User = mongoose.model('Users', userSchema);

module.exports = User;
