const express = require('express');
const validatorHandler = require('./../middlewares/validator.handler');
const RecordActivityService = require('./../services/record-activity.service');
const {
  createRecordActivityDto,
  getRecordActivityDto,
  updateRecordActivityDto,
} = require('./../dtos/record-activity.dtos');

const router = express.Router();
const recordActivityService = new RecordActivityService();

router.get('/', async (_, res, next) => {
  try {
    const recordActivities = await recordActivityService.getAll();
    res.json(recordActivities);
  } catch (error) {
    next(error);
  }
});

router.get(
  '/:id',
  validatorHandler(getRecordActivityDto, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const recordActivity = await recordActivityService.getById(id);
      res.json(recordActivity);
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
      res.json(newRecordActivity);
    } catch (error) {
      next(error);
    }
  }
);

router.put(
  '/:id',
  validatorHandler(getRecordActivityDto, 'params'),
  validatorHandler(updateRecordActivityDto, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const recordActivity = await recordActivityService.update(id, body);
      res.json(recordActivity);
    } catch (error) {
      next(error);
    }
  }
);

router.patch(
  '/:id',
  validatorHandler(getRecordActivityDto, 'params'),
  validatorHandler(updateRecordActivityDto, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const updatedRecordActivity = await recordActivityService.patch(id, body);
      res.json(updatedRecordActivity);
    } catch (error) {
      next(error);
    }
  }
);

router.delete('/:id', validatorHandler(getRecordActivityDto, 'params'), async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedRecordActivity = await recordActivityService.deleteById(id);
    res.json(deletedRecordActivity);
  } catch (error) {
    next(error);
  }
});


module.exports = router;
