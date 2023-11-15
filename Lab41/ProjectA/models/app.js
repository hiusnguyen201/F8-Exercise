"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class App extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      App.belongsTo(models.User, { foreignKey: "user_id" });
    }
  }
  App.init(
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
      callback: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "App",
    }
  );
  return App;
};
