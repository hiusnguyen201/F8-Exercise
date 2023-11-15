"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Authorize extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Authorize.belongsTo(models.User, { foreignKey: "user_id" });
    }
  }
  Authorize.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      user_id: DataTypes.INTEGER,
      client_id: DataTypes.STRING,
      code: DataTypes.STRING,
      access_token: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Authorize",
    }
  );
  return Authorize;
};
