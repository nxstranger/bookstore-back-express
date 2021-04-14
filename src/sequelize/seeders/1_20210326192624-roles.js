const { Op } = require('sequelize');

const rolesArray = [
  'user',
  'admin',
];

module.exports = {
  up: async (queryInterface) => {
    const role = await queryInterface.rawSelect(
      'Roles',
      { where: { id: { [Op.gt]: 0 } } }, ['id'],
    );
    if (!role) {
      await rolesArray.forEach((obj) => {
        const roleObj = {
          role: obj,
        };
        queryInterface.bulkInsert('Roles', [roleObj]);
      });
    }
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('Roles', null, {});
  },
};
