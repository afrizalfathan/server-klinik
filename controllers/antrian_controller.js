const { sequelize } = require("../config/db_conn");
const Antrian = require("../models/antrian_models");

const Pasien = require("../models/Pasien_models");

async function createAntrian(
  id,
  shift,
  tanggal,
  antrian,
  nama,
  no_hp,
  email,
  usia,
  jenis_kelamin
) {
  try {
    // Buat record di tabel Pasien dan simpan hasilnya ke dalam variabel `newPasien`
    const newPasien = await Pasien.create({
      nama,
      no_hp,
      email,
      usia,
      jenis_kelamin,
    });

    // Ambil `pasien_id` dari `newPasien`
    const pasien_id = newPasien.pasien_id;

    // Buat record di tabel Antrian dengan `pasien_id` yang diambil
    await Antrian.create({
      antrian_id: id,
      shift,
      tanggal,
      antrian,
      a_status: "N",
      pasien_id: pasien_id, // gunakan pasien_id dari hasil create Pasien
    });

    console.log(
      id,
      shift,
      tanggal,
      antrian,
      pasien_id,
      nama,
      no_hp,
      email,
      jenis_kelamin
    );
    console.log("1 Record Added!");
  } catch (error) {
    console.log(error);
  }
}

async function readAntrianShiftDate(shift, tanggal) {
  try {
    const result = await Antrian.findAll({
      where: { shift, tanggal },
    });
    return result.length;
  } catch (error) {
    console.log(error);
  }
}

async function readAllAntrian() {
  try {
    return await Antrian.findAll({
      include: [
        {
          model: Pasien,
          attributes: ["nama", "no_hp", "email", "jenis_kelamin"],
        },
      ],
    });
  } catch (error) {
    console.log(error);
  }
}

async function readSingleAntrian(id) {
  try {
    const antrian = await Antrian.findOne({
      where: { antrian_id: id },
      include: [
        {
          model: Pasien,
          attributes: ["nama", "no_hp", "email", "jenis_kelamin", "usia"],
        },
      ],
    });
    return antrian;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function updateAntrianStatus(id, status) {
  try {
    const antrian = await Antrian.findOne({ where: { antrian_id: id } });
    if (antrian) {
      antrian.a_status = status;
      await antrian.save();
    } else {
      throw new Error("Antrian not found");
    }
  } catch (error) {
    console.log("Error updating status:", error);
    throw error;
  }
}

async function deleteAntrian(id) {
  try {
    await Antrian.destroy({
      where: { antrian_id: id },
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function sortAntrian(shift, tanggal) {
  try {
    console.log(shift, tanggal);
    const antrian = await Antrian.findOne({
      where: {
        a_status: "N",
        tanggal,
        shift,
      },
      order: [["antrian", "ASC"]],
    });

    return antrian;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

module.exports = {
  createAntrian,
  readSingleAntrian,
  readAllAntrian,
  readAntrianShiftDate,
  updateAntrianStatus,
  deleteAntrian,
  sortAntrian,
};
