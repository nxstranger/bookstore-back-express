'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class BookAuthor extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasOne(models.Book, {
        foreignKey: 'author',
        onDelete: 'SET NULL'
      })
    }
  }
  BookAuthor.init({
    name: DataTypes.STRING
  }, {
    timestamps: false,
    sequelize,
    modelName: 'BookAuthor',
  });
  return BookAuthor;
};
