const express = require('express');
const router = express.Router();

const servicesController = require('../controllers/services');

router.get('/', servicesController.getAll);
router.get('/:id', servicesController.getSingle);
router.post('/', servicesController.createService);
router.put('/:id', servicesController.updateService);
router.delete('/:id', servicesController.deleteService);

module.exports = router;