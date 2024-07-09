const express = require('express');
const router = express.Router();
const dataController = require('../controllers/data.controller');

router.get('/users', dataController.getLast5Users);

module.exports = router;
