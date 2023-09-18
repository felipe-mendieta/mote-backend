const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

const id = Joi.objectId();
const name = Joi.string().min(3).max(40);
const email = Joi.string().email();
// eslint-disable-next-line no-unused-vars
const avatar = Joi.string().uri();
//const password = Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{6,30}$'));
const password = Joi.string().min(8);
// eslint-disable-next-line no-unused-vars
const gender = Joi.string();

const createUserDto = Joi.object({
  name: name.required(),
  email: email.required(),
  // avatar: avatar.required(),
  // password: password.required(),
  // gender: gender.required(),
});
const loginUserDto = Joi.object({
  email: email.required(),
  password: password.required(),
});
const updateUserDto = Joi.object({
  name: name.required(),
  email: email.required(),
  // avatar: avatar.required(),
  // password: password.required(),
  // gender: gender.required(),
});

const getUserByIdDto = Joi.object({
  id: id.required(),
});

module.exports = { createUserDto, updateUserDto, getUserByIdDto, loginUserDto };
