const toggleService = require('../services/toggle.service');

exports.toggleDatabase = (req, res) => {
    toggleService.toggleDatabase();
    res.send('Database toggled');
};

exports.isMongo = (req, res) => {
    res.json({ useMongo: toggleService.isMongo() });
};
