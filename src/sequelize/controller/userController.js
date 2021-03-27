'use strict'

const dbORM = require('../../sequelize/models/index');
const User = dbORM.User;
const TokenOrm = require("./tokenController")

const showedFields = ['id', 'name', 'email', 'dateOfBirthday']

module.exports.create = (userObject) => {
  const user = {
    name: userObject.name,
    email: userObject.email,
    dateOfBirthday: userObject.dateOfBirthday,
    password: userObject.password
  };


  return new Promise((success)=>{
    User.create(user)
      .then(data => TokenOrm.create(data.id)
        .then(() => success(data))
      )
      .catch(()=> console.log("UserController create error"))
  })
};

module.exports.findAll = () => {
  return new Promise((success)=>{
    User.findAll({attributes: showedFields})
      .then(data => success(data))
      .catch(()=> console.log("UserController findAll error"))
  });
};

module.exports.findOneById = (id) => {
  return new Promise((success)=>{
    User.findByPk(id,{ attributes: showedFields})
      .then(data => {
        success(data)
      })
      .catch(()=> console.log("UserController findById error"))
  });
};


module.exports.update = (userData, id) => {

  return new Promise((success, reject) => {
    User.update(userData, { where: { id: id }})
      .then(num => {
        if (num[0] > 0){
          success()
        } else {
          reject();
        }
      })
      .catch(() => console.log("UserController update error"));
  })
};

module.exports.delete = (id) => {
  return new Promise((success, reject)=> {
    User.destroy({where: { id: id }})
      .then(num => {
        if (num === 1) {
          success()
        }
        else {
          reject({code: 400, message: `Cannot delete user with id=${id}.`})
        }
      })
      .catch(() => console.log("UserController update error"));
  })
};
