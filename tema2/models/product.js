const db = require('../db');

function getProduct(id){

    return db.runQuery(`SELECT id, price, stock, name, description, category from products WHERE status=1 AND id = ${id}`);

}

function getAllProducts(){

    return db.runQuery(`SELECT id, price, stock, name, description, category from products WHERE status=1`);

}

function addProduct(data, callback){

    let price = parseFloat(data.price);
    let stock = parseInt(data.stock);
    let name = data.name;
    let description = data.description;
    let category = parseInt(data.category);

    db.runQuery(`SELECT 1 from products WHERE name LIKE '${name}'`).then( //check if already exists

        (result) => {

            if(result.length > 0){

                return callback(2); //product already exists
            }

            db.runQuery(`INSERT INTO products(id, price, stock, name, description, category, status) VALUES (NULL, ${price}, ${stock}, '${name}', '${description}', ${category}, 1) `).then(
                
                (res) => {

                    return callback(1); //success
 
                },

                (err) => {

                    console.log(err);

                    return callback(0); //query error

                }
            );

        },

        (error) => {

            return callback(0); //query error

        }

    );

}


function replaceProduct(id, data, callback){

    let price = parseFloat(data.price);
    let stock = parseInt(data.stock);
    let name = data.name;
    let description = data.description;
    let category = parseInt(data.category);

    db.runQuery(`SELECT 1 from products WHERE status = 1 AND id = ${id}`).then( //check if product exists

        (result) => {

            if(result.length < 1){

                return callback(2); //product not found
            }

            db.runQuery(`REPLACE INTO products(id, price, stock, name, description, category, status) VALUES (${id}, ${price}, ${stock}, '${name}', '${description}', ${category}, 1) `).then(
                
                (res) => {

                    return callback(1); //success
 
                },

                (err) => {

                    console.log(err);

                    return callback(0); //query error

                }
            );

        },

        (error) => {

            return callback(0); //query error

        }

    );

}

function updateProduct(id, data, callback){

    let price = parseFloat(data.price);
    let stock = parseInt(data.stock);

    db.runQuery(`SELECT 1 from products WHERE status=1 AND id = ${id}`).then( //check if product exists

        (result) => {

            if(result.length < 1){

                return callback(2); //product not found
            }

            db.runQuery(`UPDATE products SET price =  ${price}, stock = ${stock} WHERE id = ${id}`).then(
                
                (res) => {

                    return callback(1); //success
 
                },

                (err) => {

                    console.log(err);

                    return callback(0); //query error

                }
            );

        },

        (error) => {

            return callback(0); //query error

        }

    );

}

function deleteProduct(id, callback){

    db.runQuery(`SELECT 1 from products WHERE id = ${id}`).then( //check if product exists

        (result) => {

            if(result.length < 1){

                return callback(2); //product not found
            }

            db.runQuery(`UPDATE products set status=0 WHERE id = ${id}`).then(
                
                (res) => {

                    return callback(1); //success
 
                },

                (err) => {

                    console.log(err);

                    return callback(0); //query error

                }
            );

        },

        (error) => {

            return callback(0); //query error

        }

    );

}

module.exports.getProduct = getProduct;
module.exports.getAllProducts = getAllProducts;
module.exports.addProduct = addProduct;
module.exports.replaceProduct = replaceProduct;
module.exports.updateProduct = updateProduct;
module.exports.deleteProduct = deleteProduct;
