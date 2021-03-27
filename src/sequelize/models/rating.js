'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Rating extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsToMany(models.User, {through: ''})
      // Rating.hasOne(models.User, {
      //   foreignKey: { id: 'id', field: 'userId', allowNull: false, hooks:true},
      // })
      // Rating.hasOne(models.Book, {
      //   foreignKey: { id: 'id', field: 'bookId', allowNull: false, hooks:true},
      // })
      Rating.hasOne(models.User, {
        foreignKey: 'userId',
        allowNull: false,
        onDelete: 'CASCADE'
      })
      Rating.hasOne(models.Book, {
        foreignKey: 'bookId',
        allowNull: false,
        onDelete: 'CASCADE0'
      })
    }
  }
  Rating.init({
    bookId: DataTypes.INTEGER,
    userid: DataTypes.INTEGER,
    rating: DataTypes.INTEGER
  }, {
    timestamps: false,
    sequelize,
    modelName: 'Rating',
  });
  return Rating;
};
