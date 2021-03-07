const db = require('../db');

function getProduct(id){

    return db.runQuery(`SELECT * from products WHERE id = ${id}`);

}

function getAllProducts(){

    return db.runQuery(`SELECT * from products`);

}

module.exports.getProduct = getProduct;
module.exports.getAllProducts = getAllProducts;