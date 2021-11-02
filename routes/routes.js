const express = require("express");
const route = express.Router();
const multer = require("multer");
const path = require("path");

//configuration for multer
const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log("../public/files");
    cb(null, "../public/files");
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
    const { filename, mimetype, size } = req.file;
    const type = mimetype.split("/")[1];
    res.status(200).json({ name: filename, type, size });
  } catch (err) {
    res.status(400).json({ err });
  }
});

module.exports = route;
