const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

const id = Joi.objectId();
const name = Joi.string().min(2).max(40);
const email = Joi.string().email();
// eslint-disable-next-line no-unused-vars
const avatar = Joi.string().uri();
//const password = Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{6,30}$'));
const password = Joi.string().min(8);
// eslint-disable-next-line no-unused-vars
const gender = Joi.string();
const rol = Joi.string().valid("USER_ROLE", "ADMIN_ROLE");
const google = Joi.boolean();
const idGoogle = Joi.string().id();

const createUserDto = Joi.object({
  name: name.required(),
  email: email.required(),
  password,
  avatar,
  gender,
  rol,
  google,
  idGoogle

});
const loginUserDto = Joi.object({
  email: email.required(),
  password: password.required(),
});
const updateUserDto = Joi.object({
  name,
  email,
  password,
  avatar,
  gender,
  rol,
  google,
  idGoogle
});

const getUserByIdDto = Joi.object({
  id: id.required(),
});

module.exports = { createUserDto, updateUserDto, getUserByIdDto, loginUserDto };
