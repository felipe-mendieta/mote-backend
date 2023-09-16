const express = require('express');
const passport = require('passport');
const { generateJWT } = require('./../helpers/generate-jwt.helper')
const router = express.Router();


// Ruta para autenticar un usuario
router.post('/login',
  passport.authenticate('local', {session: false}),
  async (req, res, next) => {
      try {
        const user= req.user;//se resuelve lo del archivo local strategy
        const token = await generateJWT(user.id);
        res.json({
          user,
          token
        });
      } catch (error) {
        next(error);
      }
  });
module.exports = router;
