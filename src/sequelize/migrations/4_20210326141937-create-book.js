module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Books', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      title: {
        type: Sequelize.STRING,
      },
      price: {
        type: Sequelize.INTEGER,
      },
      media: {
        type: Sequelize.STRING,
      },
      description: {
        type: Sequelize.TEXT,
      },
      slug: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      category: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Categories',
          key: 'id',
        },
        onDelete: 'SET NULL',
      },
      author: {
        type: Sequelize.INTEGER,
        references: {
          model: 'BookAuthors',
          key: 'id',
        },
        onDelete: 'SET NULL',
      },
      publish: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('Books');
  },
};
