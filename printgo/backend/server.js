const express = require("express");
const multer = require("multer");
const axios = require("axios");
const FormData = require("form-data");
const fs = require("fs");
const cors = require("cors");

const app = express();

app.use(cors());

const upload = multer({ dest: "uploads/" });

const BOT_TOKEN = "ISI_BOT_TOKEN";
const CHAT_ID = "ISI_CHAT_ID";

app.post("/upload", upload.single("file"), async (req, res) => {

  try {

    const {
      nama,
      hp,
      lokasi,
      jenis_print
    } = req.body;

    const caption = `
Pesanan Print Baru

Nama: ${nama}
No HP: ${hp}
Lokasi: ${lokasi}
Jenis Print: ${jenis_print}
`;

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

    fs.unlinkSync(req.file.path);

    res.send("Pesanan berhasil dikirim!");

  } catch (error) {
    console.log(error);
    res.status(500).send("Terjadi kesalahan");
  }

});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server berjalan");
});