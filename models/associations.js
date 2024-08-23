const Pasien = require("./Pasien_models");
const Antrian = require("./antrian_models");
const Konsultasi = require("./konsul_models");

// Mengatur relasi antar model
Pasien.hasMany(Antrian, { foreignKey: "pasien_id" });
Antrian.belongsTo(Pasien, { foreignKey: "pasien_id" });

Pasien.hasMany(Konsultasi, { foreignKey: "pasien_id" });
Konsultasi.belongsTo(Pasien, { foreignKey: "pasien_id" });

// Ekspor model untuk digunakan di tempat lain
module.exports = { Pasien, Antrian, Konsultasi };
