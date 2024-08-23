const { sequelize } = require("../config/db_conn");
const Konsultasi = require("../models/konsul_models");
const Pasien = require("../models/Pasien_models");

async function createConsult(
  id,
  nama,
  no_hp,
  email,
  usia,
  jenis_kelamin,
  alergi,
  keluhan,
  alamat,
  m_pembayaran
) {
  try {
    await sequelize.sync();

    const newPasien = await Pasien.create({
      nama,
      no_hp,
      email,
      usia,
      jenis_kelamin,
    });

    const pasien_id = newPasien.pasien_id;

    await Konsultasi.create({
      konsultasi_id: id,
      alergi,
      keluhan,
      alamat,
      m_pembayaran,
      pasien_id: pasien_id,
      k_status: "Proses",
    });
    console.log("1 Record Added!");
  } catch (error) {
    console.log(error);
  }
}

async function readAllKonsul() {
  try {
    return await Konsultasi.findAll({
      include: [
        {
          model: Pasien,
          attributes: ["nama", "no_hp", "email", "jenis_kelamin", "usia"],
        },
      ],
    });
  } catch (error) {
    console.log(error);
  }
}

async function checkKonsul(id) {
  try {
    return await Konsultasi.findOne({
      where: { konsultasi_id: id },
      include: [
        {
          model: Pasien,
          attributes: ["nama", "no_hp", "email", "jenis_kelamin", "usia"],
        },
      ],
    });
  } catch (error) {
    console.log(error);
  }
}

async function readKonsul(id) {
  try {
    return await Konsultasi.findOne({
      where: { konsultasi_id: id },
      include: [
        {
          model: Pasien,
          attributes: ["nama", "no_hp", "email", "jenis_kelamin", "usia"],
        },
      ],
    });
  } catch (error) {
    console.log(error);
  }
}

async function updateConsult(id, obat, status) {
  try {
    const konsultasi = await Konsultasi.findOne({
      where: { konsultasi_id: id },
    });
    if (konsultasi) {
      if (obat) {
        konsultasi.obat = obat;
      }
      konsultasi.k_status = status;
      await konsultasi.save();
      return konsultasi;
    } else {
      throw new Error("Konsultasi not found");
    }
  } catch (error) {
    throw error;
  }
}

module.exports = {
  createConsult,
  readAllKonsul,
  readKonsul,
  updateConsult,
  checkKonsul,
};
