const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

const id = Joi.objectId();
const name = Joi.string().min(3).max(40);
const email = Joi.string().email();
const avatar = Joi.string().uri();
const password = Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{6,30}$'));
const gender = Joi.string();

const createUserDto = Joi.object({
  name: name.required(),
  email: email.required(),
  avatar: avatar.required(),
  password: password.required(),
  gender: gender.required(),
});

const updateUserDto = Joi.object({
  name,
  email,
  avatar,
  password,
  gender
});

const getUserDto = Joi.object({
  id: id.required(),
});

module.exports = { createUserDto, updateUserDto, getUserDto };
