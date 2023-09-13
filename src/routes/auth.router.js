const express = require('express');
const validatorHandler = require('../middlewares/validator.handler');
const { loginUserDto } = require('../dtos/user.dtos');
const AuthService  = require('../services/auth.service');

const router = express.Router();
const authService = new AuthService();

// Ruta para autenticar un usuario
router.post('/login',
  validatorHandler(loginUserDto, 'body'),
  async (req, res, next) => {
    try {
      const { email, password } = req.body;
      // Llama al servicio de autenticación
      const { user, token } = await authService.authenticateUser(email, password);
      // Devuelve una respuesta exitosa con el token JWT
      res.json({ user, token });
    } catch (error) {
      // Maneja los errores y devuelve una respuesta de error
      // res.status(401).json({ message: error.message });
      next(error);
    }
  });

module.exports = router;
