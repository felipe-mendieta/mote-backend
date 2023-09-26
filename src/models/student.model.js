class Student {
  constructor(id, name) {
    this.id = id;
    this.name = name;
    this.activities = [];
  }
  addActivity(activity) {
    this.activities.push(activity);
  }

  removeActivity(activityId) {
    this.activities = this.activities.filter(activity => activity.id !== activityId);
  }
}
module.exports = Student
