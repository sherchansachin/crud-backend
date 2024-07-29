const express = require("express");
const router = express.Router();
const createBook = require("../controller/bookController");

router.post("/", createBook);

module.exports = router;
