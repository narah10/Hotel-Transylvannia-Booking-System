const express = require('express');
const router = express.Router();

const servicesController = require('../controllers/services');
const validation = require('../middleware/validate');

router.get('/', servicesController.getAll);
router.get('/:id', servicesController.getSingle);
router.post('/', validation.saveService, servicesController.createService);
router.put('/:id', validation.saveService, servicesController.updateService);
router.delete('/:id', servicesController.deleteService);

module.exports = router;