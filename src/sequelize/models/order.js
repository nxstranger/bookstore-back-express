const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
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
      this.hasMany(models.Cart, {
        foreignKey: 'orderId',
      });
    }
  }
  Order.init({
    userId: DataTypes.INTEGER,
  }, {
    timestamps: false,
    sequelize,
    modelName: 'Order',
  });
  return Order;
};
