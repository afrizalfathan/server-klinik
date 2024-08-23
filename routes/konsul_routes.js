const express = require("express");
const { authenticateJWT, authorizeRole } = require("../middlewares/auth");
const {
  createConsult,
  readAllKonsul,
  readKonsul,
  updateConsult,
  checkKonsul,
} = require("../controllers/konsul_controller");
const Konsultasi = require("../models/konsul_models");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const app = express();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Router membuat konsul baru
router.post("/create_consult", async (req, res) => {
  try {
    const {
      id,
      nama,
      no_hp,
      email,
      usia,
      jenis_kelamin,
      alergi,
      alamat,
      keluhan,
      m_pembayaran,
    } = req.body;

    console.log(
      id,
      nama,
      no_hp,
      email,
      usia,
      jenis_kelamin,
      alergi,
      alamat,
      keluhan,
      m_pembayaran
    );

    const newConsult = await createConsult(
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
    );

    res.status(201).send(newConsult);
  } catch (error) {
    console.log(error);
  }
});

// Router membaca data konsul
router.get(
  "/read_all_konsul",
  authenticateJWT,
  authorizeRole("doctor"),
  async (req, res) => {
    try {
      const readKonsul = await readAllKonsul();
      res.status(201).send(readKonsul);
    } catch (error) {
      console.log(error);
      res.status(500).send({ error: error.message });
    }
  }
);

// Router membaca konsul menggunakan id di admin
router.get(
  "/konsul_details/:id",
  authenticateJWT,
  authorizeRole("doctor"),
  async (req, res) => {
    try {
      const getIdKonsul = req.params.id;
      const konsulData = await readKonsul(getIdKonsul);
      if (konsulData) {
        res.status(200).send([konsulData]);
      } else {
        res.status(404).send({ message: "Consultation not found" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: error.message });
    }
  }
);

// Router cek konsul menggunakan id
router.get("/read_data/:id", async (req, res) => {
  try {
    const result = await checkKonsul(req.params.id);
    res.send([result]);
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: error.message });
  }
});

// Router update obat di konsul
router.put(
  "/konsul_details/update/:id",
  authenticateJWT,
  authorizeRole("doctor"),
  async (req, res) => {
    const { id } = req.params;
    const { obat, k_status } = req.body;

    try {
      const updatedKonsultasi = await updateConsult(id, obat, k_status);
      res.status(200).json(updatedKonsultasi);
      console.log(obat, k_status);
    } catch (error) {
      res.status(500).json({ message: "Error updating konsultasi", error });
    }
  }
);

// Routes upload gambar
router.post(
  "/upload_payment_proof/:id",
  upload.single("image"),
  async (req, res) => {
    try {
      const { id } = req.params;
      const konsultasi = await Konsultasi.findOne({
        where: { konsultasi_id: id },
      });

      if (konsultasi) {
        konsultasi.b_pembayaran = req.file.filename;
        await konsultasi.save();
        res.status(200).json({ filename: req.file.filename });
      } else {
        res.status(404).send("Konsultasi tidak ditemukan");
      }
    } catch (error) {
      console.log(error);
      res.status(500).send({ error: error.message });
    }
  }
);

module.exports = router;
