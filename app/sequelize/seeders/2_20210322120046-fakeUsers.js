const { Op } = require('sequelize');
const dbOrm = require('../models/index');

const { User } = dbOrm;

const passwordManager = require('../../utils/passwordHashManager/passwordManager');

const fakeUserData = [];

// eslint-disable-next-line no-plusplus
for (let i = 0; i < 20; i++) {
  const passHashObj = passwordManager.hashPassword(`password${i}`);
  fakeUserData.push({
    name: 'Name',
    dateOfBirthday: '01.10.1999',
    passwordHash: passHashObj.hash,
    passwordSalt: passHashObj.salt,
    email: `email${i}@fake.fk`,
    createdAt: new Date(),
    updatedAt: new Date(),
  });
}

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkDelete('Users', null, {});
    const users = await queryInterface.select(
      User,
      'Users',
      { where: { id: { [Op.ne]: null } } },
    );
    if (!users.length) {
      await queryInterface.bulkInsert('Users', fakeUserData);
    }
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('Users', null, {});
  },
};
