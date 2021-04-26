module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Carts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      userId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      bookId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Books',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      orderId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Orders',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('Carts');
  },
};
