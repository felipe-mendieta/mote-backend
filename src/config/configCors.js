const whitelist = [
  'http://localhost:8080',
  'http://localhost:80',
];
const options = {
  origin: (origin, callback) => {
    if(whitelist.includes(origin) || !origin){
      callback(null,true);//error, permiso : no hay ningun error por eso null, por lo tanto permitir
    }else{
      callback(new Error('No permitido'))
    }
  }
}
module.exports = options;
