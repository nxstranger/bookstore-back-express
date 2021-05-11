const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class JwtUser extends Model {
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
    }
  }
  JwtUser.init({
    userId: DataTypes.INTEGER,
    refreshToken: DataTypes.STRING,
  }, {
    timestamps: false,
    sequelize,
    modelName: 'JwtUser',
  });
  return JwtUser;
};
