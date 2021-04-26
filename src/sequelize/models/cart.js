const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Cart extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.User, {
        foreignKey: 'userId',
        onDelete: 'CASCADE',
      });
      this.belongsTo(models.Book, {
        foreignKey: 'bookId',
        onDelete: 'CASCADE',
      });
      this.belongsTo(models.Order, {
        foreignKey: 'orderId',
        onDelete: 'CASCADE',
      });
    }
  }
  Cart.init({
    userId: DataTypes.INTEGER,
    bookId: DataTypes.INTEGER,
    count: DataTypes.INTEGER,
    orderId: DataTypes.INTEGER,
  }, {
    sequelize,
    timestamps: false,
    modelName: 'Cart',
  });
  return Cart;
};
