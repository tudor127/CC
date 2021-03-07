const db = require('../db');

function getCategories(id){

    return db.runQuery(`SELECT * from categories`);

}

module.exports.getCategories = getCategories;