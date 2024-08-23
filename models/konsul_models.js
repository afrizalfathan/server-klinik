const { sequelize, DataTypes } = require("../config/db_conn");
const Pasien = require("./Pasien_models");

const Konsultasi = sequelize.define("Konsultasi", {
  konsultasi_id: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true,
  },
  alergi: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  keluhan: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  alamat: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  obat: {
    type: DataTypes.JSON,
    allowNull: true,
  },
  k_status: {
    type: DataTypes.ENUM("Proses", "Dikirim", "Selesai"),
    allowNull: false,
  },
  m_pembayaran: {
    type: DataTypes.ENUM("COD", "Transfer"),
    allowNull: false,
  },
  b_pembayaran: {
    type: DataTypes.STRING,
    allowNull: true,
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

module.exports = Konsultasi;
