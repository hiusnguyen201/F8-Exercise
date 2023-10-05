const connectDb = async () => {
    const { DB_NAME, DB_PORT, DB_PASS, DB_USER, DB_HOST, DB_DRIVER} = process.env;

    const { Sequelize } = require("sequelize");

    const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
        host: DB_HOST,
        dialect: DB_DRIVER,
        port: DB_PORT
    });

    try {
        console.log("Connection has been established sucessfully");
        return sequelize;
    } catch(error) {
        console.error("Unable to connect to the database: ", error);
    }
}

module.exports = connectDb();