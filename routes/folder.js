const { Router } = require("express");
const express = require("express");
const folder = require("../controller/folder");
const router = express.Router();

// Create Folder
router.post("/", folder.createFolder);

// Get Folders
router.get("/", folder.getFolders);

// Rename Folder
router.patch("/:id", folder.renameFolder);

// Delete Folder
router.delete("/:id", folder.deleteFolder);

module.exports = router;
