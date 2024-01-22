const express = require('express');
const validatorHandler = require('./../middlewares/validator.handler');
const RecordActivityService = require('./../services/record-activity.service');
const {
  createRecordActivityDto,
  getRecordActivityByIdDto,
  updateRecordActivityDto,
} = require('./../dtos/record-activity.dtos');

const router = express.Router();
const recordActivityService = new RecordActivityService();

router.get('/', async (_, res, next) => {
  try {
    const recordActivities = await recordActivityService.getAll();
    res.status(200).json(recordActivities);
  } catch (error) {
    next(error);
  }
});

router.get(
  '/:id',
  validatorHandler(getRecordActivityByIdDto, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const recordActivity = await recordActivityService.getById(id);
      res.status(200).json(recordActivity);
    } catch (error) {
      next(error);
    }
  }
);

//get activities by room id and activityType
router.get(
  '/:roomId/:activityType',
  async (req, res, next) => {
    try {
      const { roomId, activityType } = req.params;
      const recordActivity = await recordActivityService.getByRoomIdAndActivityType(roomId, activityType);
      res.status(200).json(recordActivity);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/',
  validatorHandler(createRecordActivityDto, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newRecordActivity = await recordActivityService.create(body);
      res.status(201).json(newRecordActivity);
    } catch (error) {
      next(error);
    }
  }
);

router.put(
  '/:id',
  validatorHandler(getRecordActivityByIdDto, 'params'),
  validatorHandler(updateRecordActivityDto, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const recordActivity = await recordActivityService.update(id, body);
      res.status(200).json(recordActivity);
    } catch (error) {
      next(error);
    }
  }
);

router.patch(
  '/:id',
  validatorHandler(getRecordActivityByIdDto, 'params'),
  validatorHandler(updateRecordActivityDto, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const updatedRecordActivity = await recordActivityService.patch(id, body);
      res.status(200).json(updatedRecordActivity);
    } catch (error) {
      next(error);
    }
  }
);

router.delete('/:id',
  validatorHandler(getRecordActivityByIdDto, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const deletedRecordActivity = await recordActivityService.deleteById(id);
      res.status(200).json(deletedRecordActivity);
    } catch (error) {
      next(error);
    }
  });


module.exports = router;
