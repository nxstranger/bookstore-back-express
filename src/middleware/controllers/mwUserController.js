const ormUserController = require('../../sequelize/controller/userController');
// const userInputValidator = require('../validation/userInputValidators');

const updateAllowedFields = ['name', 'email', 'dateOfBirthday'];

module.exports.create = (req, res) => {
  const user = {
    name: req.body.name,
    email: req.body.email,
    dateOfBirthday: req.body.dateOfBirthday,
    password: req.body.password,
  };

  ormUserController.create(user)
    .then((data) => res.status(201).json(
      {
        id: data.id,
        name: data.name,
        email: data.email,
        dateOfBirthday: data.dateOfBirthday,
      },
    ))
    .catch((err) => {
      res.status(409).json({ message: err.message });
    });
};

module.exports.findAll = (req, res) => {
  ormUserController.findAll()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.status(400).json({ message: err.message });
    });
};

module.exports.findOneById = (req, res) => {
  const { id } = req.params;
  ormUserController.findOneById(id)
    .then((data) => res.status(200).json(data))
    .catch((err) => {
      res.status(400).json({ message: err.message });
    });
};

module.exports.update = (req, res) => {
  const { id } = req.params;
  const allowedFields = {};
  // let interruptUpdate = false;
  // eslint-disable-next-line no-restricted-syntax
  for (const [field, value] of Object.entries(req.body)) {
    if (updateAllowedFields.includes(field)) {
      allowedFields[field] = value;
    } else {
      res.status(400).json({ message: 'update error, wrong data' });
      return;
    }
  }
  console.log('0000000000');
  // if (allowedFields.email) {
  //   userInputValidator.userEmailExist(req)
  //     .catch((err) => {
  //       console.log('111111111');
  //       interruptUpdate = true;
  //       res.status(400).json({ message: err.message });
  //     });
  // }
  // if (interruptUpdate) return;
  console.log('2222222');
  ormUserController.update(allowedFields, id)
    .then(() => {
      console.log('3333333333');
      res.status(200).json({ message: 'updated' });
    },
    (err) => {
      res.status(400).json({ message: err.message });
    })
    .catch((err) => {
      console.log('555555555555');
      res.status(400).json({ message: err.message });
    });
};

module.exports.delete = (req, res) => {
  const { id } = req.params;
  ormUserController.delete(id)
    .then(() => res.status(200).json({ message: 'deleted' }),
      () => res.status(200).json({ message: ' not deleted' }))
    .catch((err) => {
      res.status(400).json({ message: err.message });
    });
};
