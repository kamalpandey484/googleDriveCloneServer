const express = require("express");
const file = require("../controller/common");
const router = express.Router();

// Search Files/Folders
router.get("/search", file.searchQuery);

module.exports = router;
