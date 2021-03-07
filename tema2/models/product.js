const db = require('../db');

function getProduct(id){

    return db.runQuery(`SELECT * from products WHERE id = ${id}`);

}

function getAllProducts(){

    return db.runQuery(`SELECT * from products`);

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

            db.runQuery(`INSERT INTO products(id, price, stock, name, description, category) VALUES (NULL, ${price}, ${stock}, '${name}', '${description}', ${category}) `).then(
                
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