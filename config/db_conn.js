const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize("klinik", "root", "", {
  host: "localhost",
  dialect: "mysql",
  logging: console.log,
});

module.exports = { sequelize, DataTypes, Sequelize };
