const express = require('express');
const router = express.Router();

const reservationsController = require('../controllers/reservation')

router.get('/', reservationsController.getAll);
router.get('/:id', reservationsController.getSingle);
router.post('/', reservationsController.createReservation);
router.put('/:id', reservationsController.updateReservation);
router.delete('/:id', reservationsController.deleteReservation);

module.exports = router;