const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Comment.belongsTo(models.User, {
        foreignKey: 'userId',
        allowNull: false,
      });
      Comment.belongsTo(models.Book, {
        foreignKey: 'bookId',
        allowNull: false,
      });
    }
  }
  Comment.init({
    text: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    bookId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Comment',
  });
  return Comment;
};
