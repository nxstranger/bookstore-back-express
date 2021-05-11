const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Rating extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Rating.belongsTo(models.User, {
        foreignKey: 'userId',
        onDelete: 'SET NULL',
      });
      Rating.belongsTo(models.Book, {
        foreignKey: 'bookId',
        onDelete: 'SET NULL',
      });
    }
  }
  Rating.init({
    bookId: DataTypes.INTEGER,
    userid: DataTypes.INTEGER,
    rating: DataTypes.INTEGER,
  }, {
    timestamps: false,
    sequelize,
    modelName: 'Rating',
  });
  return Rating;
};
