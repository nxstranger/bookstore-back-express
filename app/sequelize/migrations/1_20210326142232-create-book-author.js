module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('BookAuthors', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
        unique: true,
      },
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('BookAuthors');
  },
};
