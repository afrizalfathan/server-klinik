const { sequelize, DataTypes } = require("../config/db_conn");

const Pasien = sequelize.define("Pasien", {
  pasien_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  nama: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  no_hp: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  jenis_kelamin: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  usia: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
});

module.exports = Pasien;
