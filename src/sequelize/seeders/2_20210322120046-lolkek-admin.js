const passwordManager = require('../../utils/passwordHashManager/passwordManager');

const admins = [];

const passHashObj = passwordManager.hashPassword('Lolkeklol1');

admins.push({
  name: 'kekolol',
  email: 'lolo@pepe.lo',
  dateOfBirthday: '12.12.2020',
  passwordSalt: passHashObj.salt,
  passwordHash: passHashObj.hash,
  createdAt: new Date(),
  updatedAt: new Date(),
  role: 2,
});

module.exports = {
  up: async (queryInterface) => {
    const users = await queryInterface.rawSelect(
      'Users',
      { where: { email: 'lolo@pepe.lo' } }, ['id'],
    );
    if (!users) {
      await queryInterface.bulkInsert('Users', admins);
    }
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('Users', null, {});
  },
};
