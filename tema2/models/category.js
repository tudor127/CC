const db = require('../db');

function getCategories(id){

    return db.runQuery(`SELECT * from categories`);

}

function addCategory(data, callback){

    let status = parseInt(data.status);
    let name = data.name;

    db.runQuery(`SELECT 1 from categories WHERE name LIKE '${name}'`).then( //check if already exists

        (result) => {

            if(result.length > 0){

                return callback(2); //category already exists
            }

            db.runQuery(`INSERT INTO categories(id, status, name) VALUES (NULL, ${status}, '${name}') `).then(
                
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

module.exports.getCategories = getCategories;
module.exports.addCategory = addCategory;