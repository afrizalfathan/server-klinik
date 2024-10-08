const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { sequelize } = require("./config/db_conn");

const antrianRoutes = require("./routes/antrian_routes");
const userRoutes = require("./routes/user_routes");
const konsulRoutes = require("./routes/konsul_routes");
const emailRoutes = require("./routes/email_routes");

const path = require("path");

const app = express();

app.use(
  cors({
    origin: process.env.ORIGIN_CORS,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(bodyParser.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Memuat relasi antar model
require("./models/associations");

sequelize
  .authenticate()
  .then(() => {
    console.log("DB Connected!");
    return sequelize.sync({ alter: true }); // `alter: true` untuk memperbarui tabel yang ada sesuai model
  })
  .then(() => {
    console.log("Tables have been synced!");
  })
  .catch((error) => console.log(error));

// Routes
app.use("/queue", antrianRoutes);
app.use("/user", userRoutes);
app.use("/konsul", konsulRoutes);
app.use("/email_routes", emailRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
