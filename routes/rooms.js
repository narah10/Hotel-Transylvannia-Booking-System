const express = require('express');
const router = express.Router();

const roomsController = require('../controllers/rooms')

router.get('/', roomsController.getAll);
router.get('/:id', roomsController.getSingle);
router.post('/', roomsController.createRoom);
router.put('/:id', roomsController.updateRoom);
router.delete('/:id', roomsController.deleteRoom);

module.exports = router;