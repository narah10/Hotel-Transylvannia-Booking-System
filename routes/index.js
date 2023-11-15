const express = require('express');
const router = express.Router();

router.use('/guest', require('./guest'));
router.use('/rooms', require('./rooms'));
router.use('/', require('./swagger'));

module.exports = router;