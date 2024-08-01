const express = require('express');
const { generateJWT } = require('./../helpers/generate-jwt.helper')
const router = express.Router();
const UserService = require('../services/user.service');
const userService = new UserService();

// Ruta para autenticar un usuario
router.post('/login',

  async (req, res, next) => {
    try {
      const data = req.body;
      //let userRandom = crypto.randomUUID();//aqui se reemplazaria con el ID del usuario guardado en la base de datos
      /***************************************************************************** */
      let newUser;
      try {
        newUser = await userService.createAdmin({
          name: data.name,
          email: data.email,
          idGoogle: data.aud,
          rol: data.rol,
          avatar: data.picture
        });

      } catch (error) {
        newUser = await userService.getByEmail(data.email);
      }
      let token = await generateJWT(newUser._id);
      res.status(200).json({
        ok: true,
        token: token,
        userId: newUser._id,
      });
    } catch (error) {
      next(error);
    }
  });
module.exports = router;


