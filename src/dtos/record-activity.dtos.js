const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

const id = Joi.objectId();
const activityType = Joi.string().valid('sleep', "i dont get it");
const recordDate = Joi.date();
const userId = Joi.objectId();

const createRecordActivityDto = Joi.object({
  activityType: activityType.required(),
  recordDate: recordDate.required(),
  userId: userId.required(),
});

const updateRecordActivityDto = Joi.object({
  activityType: activityType.required(),
  recordDate: recordDate.required(),
  userId: userId.required(),
});

const getRecordActivityByIdDto = Joi.object({
  id: id.required(),
});

module.exports = { createRecordActivityDto, updateRecordActivityDto, getRecordActivityByIdDto };
