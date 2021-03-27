const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class JwtUser extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // JwtUser.hasOne(models.User, {
      //   foreignKey: { id: 'id', allowNull: true, hooks:true},
      // })
      JwtUser.hasOne(models.User, {
        foreignKey: 'user',
        allowNull: false,
        onDelete: 'CASCADE',
      });
    }
  }
  JwtUser.init({
    user: DataTypes.INTEGER,
    refreshToken: DataTypes.STRING,
  }, {
    timestamps: false,
    sequelize,
    modelName: 'JwtUser',
  });
  return JwtUser;
};
