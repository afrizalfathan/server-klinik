require("dotenv").config();

module.exports = {
  PORT: process.env.PORT || 3000,
  SECRET_KEY: process.env.SECRET_KEY,
  USER: process.env.USER,
  PASSAPPS: process.env.PASSAPPS,
  DB: {
    USER: process.env.DB_USER || "user",
    PASSWORD: process.env.DB_PASSWORD || "password",
    DATABASE: process.env.DB_DATABASE || "database",
    HOST: process.env.DB_HOST || "localhost",
    DIALECT: process.env.DB_DIALECT || "mysql",
  },
};
