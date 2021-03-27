'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasOne(models.Book, {
        foreignKey :'category',
        onDelete: 'SET NULL'
      })
    }
  }
  Category.init({
    title: DataTypes.STRING,
    slug: DataTypes.STRING
  }, {
    timestamps: false,
    sequelize,
    modelName: 'Category',
  });
  return Category;
};
