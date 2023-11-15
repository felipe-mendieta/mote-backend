class UserContainer {

  constructor() {
    if (UserContainer.instance) {
      return UserContainer.instance;
    }
    UserContainer.instance = this;
    this.users = [];
  }

  addUser(user) {
    this.users.push(user);
  }

  removeUser(userId) {
    this.users = this.users.filter(user => user.id !== userId);
  }

  getUser(userId) {
    return this.users.find(user => user.id === userId);
  }

  getAllUsers() {
    return this.users;
  }

  getUserAdmin(){
    return this.users.find(user => user.rol === "admin");
  }
}

module.exports = { UserContainer };
