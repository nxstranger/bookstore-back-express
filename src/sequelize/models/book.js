const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Book extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.BookAuthor, {
        foreignKey: 'author',
        onDelete: 'SET NULL',
      });
      this.belongsTo(models.Category, {
        foreignKey: 'category',
        onDelete: 'SET NULL',
      });
    }
  }
  Book.init({
    title: DataTypes.STRING,
    price: DataTypes.INTEGER,
    image: DataTypes.STRING,
    description: DataTypes.STRING,
    category: DataTypes.INTEGER,
    author: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Book',
  });
  return Book;
};
