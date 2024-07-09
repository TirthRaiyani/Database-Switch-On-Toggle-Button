const express = require('express');
const router = express.Router();
const dataService = require('../services/data.service');
const toggleService = require('../services/toggle.service');
const authenticateToken = require('../middlewares/auth.middleware');

router.get('/register', (req, res) => {
    res.render('register');
});

router.get('/login', (req, res) => {
    res.render('login');
});

router.get('/dashboard', authenticateToken, async (req, res) => {
    try {
        const users = await dataService.getLast5Users();
        res.render('dashboard', { users, isMongo: toggleService.isMongo() });
    } catch (error) {
        res.status(500).send('Error loading dashboard');
    }
});

module.exports = router;
