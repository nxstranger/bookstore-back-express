const ormUserController = require('../../sequelize/controller/userController');
const userInputValidator = require('../validation/userInputValidators')

const updateAllowedFields = [ "name", "email", "dateOfBirthday"]

module.exports.create = (req, res) => {

  const user = {
    name: req.body.name,
    email: req.body.email,
    dateOfBirthday: req.body.dateOfBirthday,
    password: req.body.password,
  };

  ormUserController.create(user)
    .then(data => res.status(200).json(
      {
        id: data.id,
        name: data.name,
        email: data.email,
        dateOfBirthday: data.dateOfBirthday,
      }
    ))
    .catch(err => {
      res.status(err.code).json({message: err.message});
    });
};

module.exports.findAll = (req, res) => {

  ormUserController.findAll()
    .then(data => {
      res.json(data)
    })
    .catch(err => {
      res.status(err.code).json({message: err.message});
    });
};

module.exports.findOneById = (req, res) => {
  const id = req.params.id;


  ormUserController.findOneById(id)
    .then(data => res.status(200).json(data))
    .catch(err => {
      res.status(err.code).json({message: err.message});
    });
};


module.exports.update = (req, res) => {
  const id = req.params.id;
  const allowedFields = {}
  for (const [field, value] of Object.entries(req.body)){
    if (updateAllowedFields.includes(field)){
      allowedFields[field] = value
    } else {
      res.send({message: "update error, wrong data"});
      return
    }
  }
  if (allowedFields.email) {
    userInputValidator.userEmailExist(req, res)
      .catch(err => {
        res.status(err.code).json({message: err.message})

      })
  }

  ormUserController.update(allowedFields, id)
    .then(() => {
        res.status(200).json({message: "updated"})},
      () => {
        res.status(204).json()
      }
    )
    .catch(err => {
      res.status(err.code).json({message: err.message});
    });
};

module.exports.delete = (req, res) => {
  const id = req.params.id;
  ormUserController.delete(id)
    .then(() => res.status(200).json({message: "deleted"}),
      () => res.status(200).json({message: " not deleted"})
    )
    .catch(err => {
      res.status(err.code).json({ message: err.message});
    });
}
