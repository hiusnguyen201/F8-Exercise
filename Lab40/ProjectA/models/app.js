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
      // define association here
    }
  }
  App.init(
    {
      name: DataTypes.STRING,
      user_id: DataTypes.INTEGER,
      client_id: DataTypes.STRING,
      client_secret: DataTypes.STRING,
      callback: DataTypes.STRING,
      homepage: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "App",
    }
  );
  return App;
};
