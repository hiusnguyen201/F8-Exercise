const { DataTypes } = require('sequelize')

const loginModel = async() => {
    const sequelize = await require('../utils/db');
    return sequelize.define("Customer", 
        {
            id: {
                type: DataTypes.NUMBER,
                primaryKey: true,
            },
            name: {
                type: DataTypes.STRING
            },
            email: {
                type: DataTypes.STRING,
            },
            password: {
                type: DataTypes.STRING,
            }
        },
        {
            timestamps: false,
            tableName: 'customers'
        }
    );
};

module.exports = loginModel();    