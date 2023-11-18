const express = require('express');
const router = express.Router();

router.use('/guest', require('./guest'));
router.use('/rooms', require('./rooms'));
router.use('/services', require('./services'));
router.use('/staff', require('./staff'));
router.use('/', require('./swagger'));

module.exports = router;