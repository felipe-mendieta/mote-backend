/* eslint-disable no-undef */

const env = 'production';//Leermos en que entorno estamos, por defecto en desarrollo
const envs = {
  'dev': 'dev.env',
  'prod': 'prod.env'
}

require('dotenv').config({
  path: envs[env]
});

const config = {
  env,
  isProd: process.env.NODE_ENV === 'prod',
  port: process.env.BACKEND_PORT || 3000,
  dbUser: process.env.MONGO_USER,
  dbPassword: process.env.MONGO_PASSWORD,
  dbHost: process.env.MONGO_HOST,
  dbName: process.env.MONGO_DB,
  dbPort: process.env.MONGO_PORT,
  apiKey: process.env.API_KEY,
  secretPrivateKey: process.env.SECRETRPRIVATEKEY,
  googleClienteId: process.env.GOOGLE_CLIENT_ID,
  googleSecretId: process.env.GOOGLE_SECRET_ID,
  myDomainApp: process.env.MYDOMAINAPP
}
module.exports = config;
