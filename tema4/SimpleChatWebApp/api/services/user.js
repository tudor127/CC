const sequelize = require('../db');
const Users = require('../models').User;
const addUser = user => Users.create(user);
const getUserByLogin = username => Users.findOne({where: {username}});

module.exports = {
    addUser,
    getUserByLogin
}