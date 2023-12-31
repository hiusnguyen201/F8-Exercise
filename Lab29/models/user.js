'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.Mail, {foreignKey: "sendby_id"});
    }
  }
  User.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    name: DataTypes.STRING(50),
    email: DataTypes.STRING(100),
    password: DataTypes.STRING(100),
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};