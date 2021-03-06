const express = require("express");
const route = express.Router();
const multer = require("multer");
const path = require("path");

//configuration for multer
const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../public/files"));
  },
  filename: (req, file, cb) => {
    const type = file.mimetype.split("/")[1];
    cb(null, `${file.fieldname}-${Date.now()}.${type}`);
  },
});

const upload = multer({
  storage: multerStorage,
});

route.post("/", upload.single("upfile"), (req, res) => {
  try {
    console.log(req.file);
    const { originalname, mimetype, size } = req.file;
    return res.status(200).json({ name: originalname, type: mimetype, size });
  } catch (err) {
    return res.status(400).json({ err });
  }
});

module.exports = route;
