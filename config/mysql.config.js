const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
    database: process.env.MYSQL_DATABASE,
    username: process.env.MYSQL_USER,
    password: '',
    port: process.env.MYSQL_PORT,
    host: process.env.MYSQL_HOST,
    dialect: process.env.MYSQL_DIALECT
})

sequelize.authenticate().then(() => {
    console.log('connection established')
}).catch((error) => { console.error('unable to connect database', error) })

module.exports = sequelize