'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Mail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Mail.belongsTo(models.User, {foreignKey: "id"});
    }
  }
  Mail.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    sendby_id: DataTypes.INTEGER,
    sendto_id: DataTypes.INTEGER,
    status: DataTypes.BOOLEAN,
    subject: DataTypes.STRING(100),
    content: DataTypes.TEXT,
  }, {
    sequelize,
    modelName: 'Mail',
  });
  return Mail;
};