const express = require("express");
const router = express.Router();

const guestsController = require("../controllers/guest");

// This route will get all the students
router.get("/", guestsController.getAll);
router.get("/:id", guestsController.getSingle);
router.post("/", guestsController.createGuest);
router.put('/:id', guestsController.updateGuest);
router.delete('/:id', guestsController.deleteGuest);

module.exports = router;