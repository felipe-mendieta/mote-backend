const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    //required: true,
  },
  email: {
    type: String,
    unique: [true, 'Email already used!'],
    //required: true
    sparse: true
  },
  password: {
    type: String,
  },
  avatar: {
    type: String,
    trim: true
  },
  gender: {
    type: String,
    trim: true,
  },
  rol: {
    type: String,
    //required: true,
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
userSchema.index({ email: 1 }, { unique: true, partialFilterExpression: { email: { $exists: true, $ne: null } } });
userSchema.methods.toJSON = function () {
  // eslint-disable-next-line no-unused-vars
  const { __v, password, ...user } = this.toObject();
  return user;
}//quitamos la contraseña hasheada al devolver la información del usuario y cambios el nombre de _id por uid(user id)
//quitamos __v

const User = mongoose.model('User', userSchema);

module.exports = User;
