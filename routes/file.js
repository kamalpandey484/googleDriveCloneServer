const express = require("express");
const file = require("../controller/file");
const upload = require("../utils/multer");
const { route } = require("./folder");
const router = express.Router();

// Create File
router.post("/", upload.single("image"), file.createFile);

// Get Files
router.get("/", file.getFiles);

// Delete File
router.delete("/:id", file.deleteFile);

// Rename File
router.patch("/:id", file.renameFile);

module.exports = router;
