const { sequelize, DataTypes } = require("../config/db_conn");
const Pasien = require("./Pasien_models");

const Antrian = sequelize.define("Antrian", {
  antrian_id: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true,
  },
  shift: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  tanggal: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  antrian: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  a_status: {
    type: DataTypes.ENUM("Y", "N"),
    allowNull: false,
  },
  pasien_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Pasien,
      key: "pasien_id",
    },
  },
});

module.exports = Antrian;
