const dataService = require('../services/data.service');

exports.getLast5Users = async (req, res) => {
    try {
        const users = await dataService.getLast5Users();
        res.json(users);
    } catch (error) {
        res.status(500).send('Error fetching users');
    }
};
