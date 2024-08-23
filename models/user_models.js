const { sequelize, DataTypes } = require("../config/db_conn");

const User = sequelize.define(
  "user",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING(128),
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: false, // Menonaktifkan timestamps
  }
);

module.exports = User;
