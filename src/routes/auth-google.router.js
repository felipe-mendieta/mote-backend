const express = require('express');
const passport = require('passport');
const router = express.Router();
const { generateJWT } = require('./../helpers/generate-jwt.helper');
// Ruta para iniciar el proceso de autenticación con Google
router.get('/google',
  passport.authenticate('google', {
    scope: ['profile', 'email'], // Solicita acceso al perfil y correo electrónico del usuario
  })
);

// Ruta para manejar la redirección después de la autenticación con Google
router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: '/failature' }),
  async function (req, res) {
    const user = req.user;//se resuelve lo del archivo local strategy
    const token = await generateJWT(user.id);
    res.json(
      {
        user: req.user,
        token
      })
  }
);
module.exports = router;
