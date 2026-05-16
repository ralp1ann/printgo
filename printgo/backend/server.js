const express = require("express");
const multer = require("multer");
const axios = require("axios");
const FormData = require("form-data");
const fs = require("fs");
const cors = require("cors");
const path = require("path");

const app = express();

// =========================
// CONFIG
// =========================

const BOT_TOKEN = "ISI_TOKEN_BOT_KAMU";
const CHAT_ID = "ISI_CHAT_ID_KAMU";

const PORT = process.env.PORT || 3000;

// =========================
// MIDDLEWARE
// =========================

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// =========================
// UPLOAD SETUP
// =========================

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },

  filename: function (req, file, cb) {
    const uniqueName = Date.now() + "-" + file.originalname;
    cb(null, uniqueName);
  }
});

const upload = multer({
  storage: storage,

  limits: {
    fileSize: 20 * 1024 * 1024
  },

  fileFilter: function (req, file, cb) {

    const allowedTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "application/vnd.ms-powerpoint",
      "application/vnd.openxmlformats-officedocument.presentationml.presentation",
      "image/png",
      "image/jpeg"
    ];

    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Format file tidak didukung"));
    }
  }
});

// =========================
// ROOT ROUTE
// =========================

app.get("/", (req, res) => {
  res.send("Backend PrintGo Campus berjalan!");
});

// =========================
// UPLOAD ROUTE
// =========================

app.post("/upload", upload.single("file"), async (req, res) => {

  try {

    if (!req.file) {
      return res.status(400).send("File belum dipilih");
    }

    const {
      nama,
      hp,
      lokasi,
      jenis_print
    } = req.body;

    const caption = `🖨️ PESANAN PRINT BARU

👤 Nama: ${nama}
📱 No HP: ${hp}
📍 Lokasi: ${lokasi}
🎨 Jenis Print: ${jenis_print}
📄 File: ${req.file.originalname}`;

    const formData = new FormData();

    formData.append("chat_id", CHAT_ID);
    formData.append("caption", caption);

    formData.append(
      "document",
      fs.createReadStream(req.file.path),
      req.file.originalname
    );

    await axios.post(
      `https://api.telegram.org/bot${BOT_TOKEN}/sendDocument`,
      formData,
      {
        headers: formData.getHeaders()
      }
    );

    // Hapus file setelah dikirim
    fs.unlinkSync(req.file.path);

    return res.status(200).send("Pesanan berhasil dikirim ke admin!");

  } catch (error) {

    console.log(error);

    return res.status(500).send("Terjadi kesalahan server");
  }
});

// =========================
// ERROR HANDLER
// =========================

app.use((error, req, res, next) => {

  if (error instanceof multer.MulterError) {

    if (error.code === "LIMIT_FILE_SIZE") {
      return res.status(400).send("Ukuran file terlalu besar");
    }
  }

  if (error) {
    return res.status(400).send(error.message);
  }

  next();
});

// =========================
// START SERVER
// =========================

app.listen(PORT, () => {
  console.log(`Server berjalan di port ${PORT}`);
});
