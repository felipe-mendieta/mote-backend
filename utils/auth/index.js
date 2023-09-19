const passport = require('passport');
//const LocalStrategy = require('./strategies/local.strategy');
const configureGoogleStrategy = require('./strategies/google.stategy');
const GoogleStrategy = configureGoogleStrategy();


passport.use(GoogleStrategy);
//passport.use(LocalStrategy);
