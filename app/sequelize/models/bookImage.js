const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class BookImage extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      BookImage.belongsTo(models.Book, {
        foreignKey: 'bookId',
        allowNull: false,
        onDelete: 'CASCADE',
      });
    }
  }
  BookImage.init({
    name: DataTypes.STRING,
    bookId: DataTypes.INTEGER,
    index: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'BookImage',
    timestamps: false,
  });
  return BookImage;
};
