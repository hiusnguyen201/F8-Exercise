//  Customer Model
const { DataTypes } = require('sequelize');

const Customer = async () => {
    const sequelize = await require("../utils/db");
    
    return sequelize.define('Customer', {
        id: {
            type: DataTypes.NUMBER,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
        },
        email: {
            type: DataTypes.STRING,
        },
        password: {
            type: DataTypes.STRING,
        },
        status: {
            type: DataTypes.NUMBER,
        },
        deleted_at: {
            type: DataTypes.DATE,
        },
        created_at: {
            type: DataTypes.DATE,
        },
        updated_at: {
            type: DataTypes.DATE,
        },
        province_id: {
            type: DataTypes.NUMBER,
        }
    },
    {
        timestamps: false,
        tableName: 'customers'
    });
};

module.exports = Customer();

// Convert tu Model name sang Table name
// Customer => Customers

// Nguyen tac khi dat ten Model:
/*
Ten file model trung ten model
dung pascalcase de dat ten
ten model trung voi ten table trong database (dung so it)
1 file model chi lam viec 1 table 
*/