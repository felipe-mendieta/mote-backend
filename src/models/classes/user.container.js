class UserContainer {

  constructor() {
    if (UserContainer.instance) {
      return UserContainer.instance;
    }
    this.users = [];
    UserContainer.instance = this;
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
}

module.exports = { UserContainer };
