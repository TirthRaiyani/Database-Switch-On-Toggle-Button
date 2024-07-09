const express = require('express');
const router = express.Router();
const toggleController = require('../controllers/toggle.controller');

router.post('/toggle', toggleController.toggleDatabase);
router.get('/isMongo', toggleController.isMongo);

module.exports = router;
