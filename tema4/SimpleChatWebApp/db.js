const config = require('./config');
const {Sequelize} = require('sequelize');
const { db } = require('./config');

var sequelize = new Sequelize(config.db.database, config.db.username, config.db.password, {
    host: config.db.host,
    dialect: config.db.dialect,
    port: config.db.port
  });

module.exports = sequelize;