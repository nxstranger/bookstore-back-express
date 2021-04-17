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
        onDelete: 'CASCADE',
      });
      this.hasMany(models.Rating, {
        foreignKey: 'bookId',
      });
      this.hasMany(models.BookImage, {
        foreignKey: 'bookId',
      });
    }
  }
  Book.init({
    title: DataTypes.STRING,
    price: DataTypes.INTEGER,
    media: DataTypes.STRING,
    description: DataTypes.TEXT,
    category: DataTypes.INTEGER,
    author: DataTypes.INTEGER,
    slug: DataTypes.STRING,
    publish: DataTypes.BOOLEAN,
  }, {
    sequelize,
    modelName: 'Book',
    timestamps: false,
  });
  return Book;
};
