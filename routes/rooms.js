const express = require('express');
const router = express.Router();

const roomsController = require('../controllers/rooms')
const validation = require('../middleware/validate')

router.get('/', roomsController.getAll);
router.get('/:id', roomsController.getSingle);
router.post('/', validation.saveRoom, roomsController.createRoom);
router.put('/:id', validation.saveRoom, roomsController.updateRoom);
router.delete('/:id', roomsController.deleteRoom);

module.exports = router;