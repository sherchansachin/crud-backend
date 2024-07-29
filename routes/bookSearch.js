const express = require("express");
const router = express.Router();
const searchBook = require("../controller/bookSearch");

router.get("/", searchBook);

module.exports = router;
