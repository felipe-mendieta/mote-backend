var passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const config = require('../../../src/config/config');
const { endpoints } = require('./../../../src/routes/index');
const UserService = require('./../../../src/services/user.service');
const userService = new UserService();
// Configura la estrategia de autenticación con Google
const configureGoogleStrategy = () => {
  return new GoogleStrategy(
    {
      clientID: `${config.googleClienteId}`,
      clientSecret: `${config.googleSecretId}`,
      callbackURL: `${config.myDomainApp}:${config.port}${endpoints.baseApi}${endpoints.auth}/google/callback`, // Ajusta la URL de callback según tu configuración
      //http://localhost:3000/api/v1/auth/google/callback
    },
    async function (accessToken, refreshToken, profile, done) {
      try {
        const email = profile.emails ? profile.emails[0].value : '';

        const newUser = {
          name: profile.displayName || '',
          email: email,
          avatar: profile.photos ? profile.photos[0].value : '',
          gender: profile.gender || '',
          rol: 'USER_ROLE',
          status: true,
          google: true,
          idGoogle: profile.id
        };

        let user = await userService.getByEmail(email);

        if (!user) {
          user = await userService.createUserGoogle(newUser);
        }

        user = {
          ...newUser,
          id: user.id,
          accessToken: accessToken,
          refreshToken: refreshToken
        };

        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  );
}

// Configura la serialización y deserialización de usuarios para la sesión
//Con estos ajustes, al autenticarse, almacenarás solo el ID del usuario en la sesión y,
//al deserializar, buscarás al usuario en la base de datos usando ese ID.
passport.serializeUser((user, cb) => {
  // eslint-disable-next-line no-undef
  process.nextTick(function () {
    console.log('ID de usuario serializado:', user.id);
    cb(null, user.id);
  });
});

passport.deserializeUser(
  async (id, cb) => {
  try {
    const user = await userService.getById(id);
    cb(null, user); // Devuelve el objeto de usuario encontrado
  } catch (error) {
    cb(error, null);
  }
});


module.exports = configureGoogleStrategy;
