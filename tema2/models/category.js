const db = require('../db');

function getCategories(id){

    return db.runQuery(`SELECT id, name from categories WHERE status = 1`);

}

function addCategory(data, callback){

    let name = data.name;

    db.runQuery(`SELECT 1 from categories WHERE name LIKE '${name}'`).then( //check if already exists

        (result) => {

            if(result.length > 0){

                return callback(2); //category already exists
            }

            db.runQuery(`INSERT INTO categories(id, status, name) VALUES (NULL, 1, '${name}') `).then(
                
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


function updateCategory(id, data, callback){

    let name = data.name;

    db.runQuery(`SELECT 1 from categories WHERE id = ${id} AND status=1`).then( //check if category exists

        (result) => {

            if(result.length < 1){

                return callback(2); //category not found
            }

            db.runQuery(`UPDATE categories SET name = '${name}' WHERE id = ${id} `).then(
                
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

function deleteCategory(id, callback){

    db.runQuery(`SELECT 1 from categories WHERE id = ${id}`).then( //check if category exists

        (result) => {

            if(result.length < 1){

                return callback(2); //category not found
            }

            db.runQuery(`UPDATE categories SET status=0 WHERE id = ${id} `).then(
                
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
module.exports.updateCategory = updateCategory;
module.exports.deleteCategory = deleteCategory;