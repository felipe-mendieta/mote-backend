const express = require('express');
const passport = require('passport');
const router = express.Router();
//const { generateJWT } = require('./../helpers/generate-jwt.helper');
// Ruta para iniciar el proceso de autenticación con Google
router.get('/google',
  passport.authenticate('google', {
    scope: ['profile', 'email'], // Solicita acceso al perfil y correo electrónico del usuario
  })
);

// Ruta para manejar la redirección después de la autenticación con Google
router.get('/google/callback',
  passport.authenticate('google',
    { failureRedirect: '/', failureMessage: true }),
    (req,res)=> {
      res.redirect( '/api/v1/auth/user');
    }
);

router.get('/user',
  (req, res) => {
    res.json( req.user );
  }
);
module.exports = router;
