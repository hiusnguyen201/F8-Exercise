"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Client extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Client.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: DataTypes.STRING,
      user_id: DataTypes.INTEGER,
      client_id: DataTypes.STRING,
      client_secret: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Client",
    }
  );
  return Client;
};
