'use strict';

const passwordManager = require('../../utils/passwordHashManager/passwordManager')
let fakeUserData = []

for (let i = 0; i < 20; i++){
  const passHashObj = passwordManager.hashPassword(`password${i}`)
  fakeUserData.push({
    name: "Name",
    dateOfBirthday: `01.10.1999`,
    passwordHash: passHashObj.hash,
    passwordSalt: passHashObj.salt,
    email: `email${i}@fake.fk`,
    createdAt: new Date(),
    updatedAt: new Date()
  })
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    for (const userObj of fakeUserData){
      await queryInterface.bulkInsert('Users',[userObj])
    }

  },

  down: async (queryInterface, Sequelize) => {
    for (const userObj of fakeUserData){
      await queryInterface.bulkDelete('Users',{email: userObj.email},{})
    }
  }
};
