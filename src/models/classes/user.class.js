class User {
  constructor(codeRoom, id, token) {
    this.codeRoom = codeRoom;
    this.id = id;
    this.token= token
  }
  addIdSocket(idSocket) {
    this.idSocket = idSocket;
  }
}
module.exports = {User};
