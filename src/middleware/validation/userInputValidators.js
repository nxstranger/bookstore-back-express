const userDb = require('../../sequelize/models/index').User;

module.exports.userEmailExist = (req) => new Promise((success, reject) => {
  userDb.findOne({ where: { email: req.body.email } })
    .then((user) => {
      if (user) {
        reject(Error('this email already exits in db'));
        return;
      }
      success();
    });
});

module.exports.validateRegisterFieldsNotEmpty = (req) => new Promise((success, reject) => {
  if (!(req.body.name && req.body.dateOfBirthday && req.body.password && req.body.email)) {
    reject(Error('Content can not be empty!'));
    return;
  }
  success();
});

module.exports.validateRegisterFieldsData = (req, res) => new Promise((success) => {
  const fullNameRegex = /^([a-z]+)|([а-я]+)$/i;
  const emailRegex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g;
  const dateOfBirthdayRegex = /^(0[1-9]|1[012])[-/.](0[1-9]|[12][0-9]|3[01])[-/.](19|20)\d\d$/g;
  const passwordRegex = /^.{8,}$/;

  const user = {
    name: req.body.name,
    email: req.body.email,
    dateOfBirthday: req.body.dateOfBirthday,
    password: req.body.password,
  };

  if (!user.name.match(fullNameRegex)) {
    res.status(400).json({ message: "full name must be inputted like 'name surname' supported lang en, ru" });
    return;
  }
  if (!user.email.match(emailRegex)) {
    res.status(400).json({ message: 'its not email' });
    return;
  }
  if (!(user.dateOfBirthday.match(dateOfBirthdayRegex))) {
    res.status(400).json({ message: 'date of birthday: mm.dd.yyyy separated . - /' });
    return;
  }
  if (!user.password.match(passwordRegex)) {
    res.status(400).json({ message: 'password min length 8 symbols' });
    return;
  }
  success();
});
