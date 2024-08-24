const express = require("express");
const { authenticateJWT, authorizeRole } = require("../middlewares/auth");
const {
  createAntrian,
  readSingleAntrian,
  readAllAntrian,
  readAntrianShiftDate,
  updateAntrianStatus,
  deleteAntrian,
  sortAntrian,
  getTotalAntrianHariIni,
  getAntrianShiftHariIni,
} = require("../controllers/antrian_controller");

const router = express.Router();

router.post("/create_queue", async (req, res) => {
  let { id, nama, no_hp, email, jenis_kelamin, shift, tanggal, usia } =
    req.body;

  console.log("Tanggal sebelum formatting: ", tanggal);

  const parsedDate = Date.parse(tanggal);

  if (isNaN(parsedDate)) {
    return res.status(400).send({ error: "Invalid date format" });
  }

  const formattedTanggal = new Date(parsedDate).toISOString().split("T")[0];
  console.log("Formatted Tanggal: ", formattedTanggal);

  const antrianLength = await readAntrianShiftDate(shift, formattedTanggal);
  const antrianHandler = antrianLength < 1 ? 1 : antrianLength + 1;

  try {
    await createAntrian(
      id,
      shift,
      formattedTanggal,
      antrianHandler,
      nama,
      no_hp,
      email,
      usia,
      jenis_kelamin
    );

    // Mengirim respons dengan status 201 jika berhasil
    res.status(201).send({ message: "Antrian created successfully" });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

router.get("/read_data/:id", async (req, res) => {
  try {
    const result = await readSingleAntrian(req.params.id);
    res.send([result]);
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: error.message });
  }
});

router.get(
  "/read_data",
  authenticateJWT,
  authorizeRole("admin"),
  async (req, res) => {
    try {
      const readsAntrian = await readAllAntrian();
      res.status(201).send(readsAntrian);
    } catch (error) {
      console.log(error);
    }
  }
);

// Tambahkan ini di antrian_router.js
router.put(
  "/update_status/:id",
  authenticateJWT,
  authorizeRole("admin"),
  async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    console.log(status, id);

    try {
      const updatedAntrian = await updateAntrianStatus(id, status);
      res.status(200).send(updatedAntrian);
    } catch (error) {
      console.log("Error in route /update_status:", error);
      res.status(500).send({ error: error.message });
    }
  }
);

router.delete(
  "/antrian_del/:id",
  authenticateJWT,
  authorizeRole("admin"),
  async (req, res) => {
    try {
      const destAntrian = await deleteAntrian(req.params.id); // Meneruskan ID dari params
      res.status(200).send(destAntrian);
    } catch (error) {
      console.log(error);
      res.status(500).send("Gagal menghapus antrian");
    }
  }
);

router.get("/shift/:shift/:tanggal", async (req, res) => {
  const { shift, tanggal } = req.params;
  const shiftHandler =
    shift === "1" ? "Shift 1 : 06.30 - 08.30" : "Shift 2 : 16.30 - 19.30";
  console.log(shiftHandler);
  try {
    const antrian = await sortAntrian(shiftHandler, tanggal);
    res.json(antrian);
  } catch (error) {
    res.status(500).json({ error: "Error fetching queue data" });
  }
});

// Route to get the total number of queues for today
router.get("/total_queues_today", async (req, res) => {
  try {
    const totalQueues = await getTotalAntrianHariIni();
    res.status(200).send(totalQueues);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route to get the number of queues for shift 1 today
router.get("/shift1_queues_today", async (req, res) => {
  try {
    const shift1Queues = await getAntrianShiftHariIni(1);
    res.status(200).send(shift1Queues);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route to get the number of queues for shift 2 today
router.get("/shift2_queues_today", async (req, res) => {
  try {
    const shift2Queues = await getAntrianShiftHariIni(2);
    res.status(200).send(shift2Queues);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
