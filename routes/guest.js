const express = require("express");
const router = express.Router();

const guestsController = require("../controllers/guest");
const validation = require('../middleware/validate');

// This route will get all the students
router.get("/", guestsController.getAll);
router.get("/:id", guestsController.getSingle);
router.post("/", validation.saveGuest, guestsController.createGuest);
router.put('/:id', validation.saveGuest, guestsController.updateGuest);
router.delete('/:id', guestsController.deleteGuest);

module.exports = router;