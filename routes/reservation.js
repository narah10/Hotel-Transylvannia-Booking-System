const express = require('express');
const router = express.Router();

const reservationsController = require('../controllers/reservation');
const validation = require('../middleware/validate');

router.get('/', reservationsController.getAll);
router.get('/:id', reservationsController.getSingle);
router.post('/', validation.saveReservation, reservationsController.createReservation);
router.put('/:id', validation.saveReservation, reservationsController.updateReservation);
router.delete('/:id', reservationsController.deleteReservation);

module.exports = router;