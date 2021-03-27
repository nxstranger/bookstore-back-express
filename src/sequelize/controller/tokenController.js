const dbORM = require('../../sequelize/models/index');
const dbToken = dbORM.JwtUser;

module.exports.create = (user) => {
    return new Promise((success, reject) =>{
        dbToken.create(
          {user: user}
        )
          .then(()=> {success()}, ()=> {reject({message: 'db error'})})
          .catch(()=>reject({message: " refresh token write to db"}))
    })
}

module.exports.setToken = (userid, token) => {
    return new Promise((success, reject) =>
    {
        dbToken.update({refreshToken: token}, {where: {user: userid}})
          .then(()=>success({message: "updated"}))
          .catch(err=>reject({message: err}))
    })
}

module.exports.findToken = (userId) => {
    return new Promise((success, reject) => {
        dbToken.findOne({where: {user: userId}})
          .then(data => success(data))
          .catch(err=> reject("error when find token"))
    })
}
