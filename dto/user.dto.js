module.exports = class UserDto {
  id;
  fName;
  lName;
  userName;
  activated;
  role;

  constructor(model) {
    this.id = model._id;
    this.fName = model.fName;
    this.lName = model.lName;
    this.userName = model.userName;
    this.activated = model.activated;
    this.role = model.role;
  }
};
