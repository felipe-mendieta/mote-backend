const config = require('../config/config');
const whitelist = [
  `${config.myDomainApp}:80`,
  `${config.myDomainApp}`,
  `${config.myDomainApp}:4200`,
  `${config.myDomainApp}:${config.port}`,
];
const options = {
  origin: (origin, callback) => {
    if (whitelist.includes(origin) || !origin) {
      callback(null, true);//error, permiso : no hay ningun error por eso null, por lo tanto permitir
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}
module.exports = options;
