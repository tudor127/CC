const mysql = require('mysql');
const config = require('./config');

function runQuery(query){
    
    var con = mysql.createConnection({
        host: config.db.host,
        user: config.db.user,
        password: config.db.pass,
        database: config.db.name
    });

    return new Promise((resolve, reject) => {

        if(con){

            con.connect(function(err) {

                if (err){

                    reject("Can't connect to database");

                }
               
                if(query){

                    con.query(query, function (error, result) {

                        con.end();

                        if (error){

                            reject(error);

                        }else{

                            resolve(result);

                        }

                    });

                }else{

                    con.end();
                    reject('Query is missing');

                }

            });

        }else{
            
            reject('Connection error');
            
        }

    });

}

module.exports.runQuery = runQuery;