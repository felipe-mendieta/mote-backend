const express = require('express');
const crypto = require('crypto');
const { generateJWT } = require('./../helpers/generate-jwt.helper')
const router = express.Router();
const { UserContainer } = require('../models/classes/user.container');

// Ruta para autenticar un usuario
router.post('/login',

  async (req, res, next) => {
    try {
      const { rol, } = req.headers;
      let userRandom = crypto.randomUUID();//aqui se reemplazaria con el ID del usuario guardado en la base de datos
      const userContainer = new UserContainer();
      /***************************************************************************** */
      let token = await generateJWT(userRandom);
      userContainer.addUser({
        uuid: userRandom,
        token: token,
        rol: rol
      });
      res.status(200).json({
        ok: true,
        token: token,
        userId: userRandom,
      });
    } catch (error) {
      next(error);
    }
  });
module.exports = router;


