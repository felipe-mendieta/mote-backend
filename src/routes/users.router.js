const express = require('express');
const validatorHandler = require('./../middlewares/validator.handler');
const UserService = require('./../services/user.service');
const { createUserDto, getUserByIdDto, updateUserDto } = require('./../dtos/user.dtos');

const router = express.Router();
const userService = new UserService();

router.get('/', async (_, res, next) => {
  try {
    const users = await userService.getAll();
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
});

router.get(
  '/:id',
  validatorHandler(getUserByIdDto, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const user = await userService.getById(id);
      res.status(200).json(user); // Código de estado 200 para "OK"
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/',
  validatorHandler(createUserDto, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newUser = await userService.create(body);
      res.status(201).json(newUser); // Código de estado 201 para "Created"
    } catch (error) {
      next(error);
    }
  }
);

router.put(
  '/:id',
  validatorHandler(getUserByIdDto, 'params'),
  validatorHandler(updateUserDto, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const user = await userService.update(id, body);
      res.status(200).json(user); // Código de estado 200 para "OK"
    } catch (error) {
      next(error);
    }
  }
);

router.patch('/:id',
  validatorHandler(getUserByIdDto, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const updatedUser = await userService.patch(id, body);
      res.status(200).json(updatedUser); // Código de estado 200 para "OK"
    } catch (error) {
      next(error);
    }
  });

// Ruta para eliminar un usuario por ID (DELETE)
router.delete('/:id',
  validatorHandler(getUserByIdDto, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const deletedUser = await userService.deleteById(id);
      res.status(200).json(deletedUser); // Código de estado 200 para "OK"
    } catch (error) {
      next(error);
    }
  });
module.exports = router;
