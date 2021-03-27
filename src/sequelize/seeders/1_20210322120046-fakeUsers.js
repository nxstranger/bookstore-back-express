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
    await queryInterface.bulkInsert('Users',fakeUserData)
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('Users', null, {})
  },
};
