const express = require("express");
const router = express.Router();

const guestsController = require("../controllers/guest");

// This route will get all the students
router.get("/", guestsController.getAll);

module.exports = router;