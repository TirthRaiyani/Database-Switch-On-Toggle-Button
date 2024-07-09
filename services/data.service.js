const MongoUser = require('../models/mongoUser.model');
const MySQLUser = require('../models/mysqlUser.model');
const toggleService = require('./toggle.service');

exports.getLast5Users = async () => {
    if (toggleService.isMongo()) {
        return await MongoUser.find().sort({ createdAt: -1 }).limit(5);
    } else {
        return await MySQLUser.findAll({ limit: 5, order: [ [ 'createdAt', 'DESC' ] ] });
    }
};
