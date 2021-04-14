const { Model } = require('sequelize');

const moment = require('moment');
const passwordManager = require('../../utils/passwordHashManager/passwordManager');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasOne(models.JwtUser, {
        foreignKey: 'userId',
        allowNull: false,
      });
      this.hasOne(models.Role, {
        foreignKey: 'role',
        allowNull: false,
      });
      this.hasMany(models.Rating, {
        foreignKey: 'userid',
        allowNull: false,
        onDelete: 'CASCADE',
      });
      this.hasMany(models.Comment, {
        foreignKey: 'userid',
        allowNull: false,
        onDelete: 'CASCADE',
      });
    }
  }
  User.init({
    name: {
      type: DataTypes.STRING,
      validate: {
        len: [1, 255],
        is: /^([a-z]+)|([а-я]+)$/i,
      },
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    role: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
    },
    passwordHash: DataTypes.STRING,
    passwordSalt: DataTypes.STRING,
    dateOfBirthday: {
      type: DataTypes.DATEONLY,
      validate: {
        isDate: true,
      },
      get() {
        return moment.utc(this.getDataValue('dateOfBirthday')).format('MM-DD-YYYY');
      },
      set(value) {
        this.setDataValue('dateOfBirthday', moment(value, 'MM/DD/YYYY'));
      },
    },

  }, {
    setterMethods: {
      password(pass) {
        const passHashObj = passwordManager.hashPassword(pass);
        this.setDataValue('passwordHash', passHashObj.hash);
        this.setDataValue('passwordSalt', passHashObj.salt);
      },
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};
