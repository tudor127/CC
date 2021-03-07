
function getCategories(callback){

    var model = require('../models/category');

    var output = {};

    model.getCategories().then(
        
        (results) => {

            if(results.length > 0){

                output.data = results;
                output.statusCode = 200;

            }else{

                output.statusCode = 204;
                output.data = [];

            }

            return callback(output);

        },

        (error) => {

            output.statusCode = 500;
            output.data = {'error' : 'Internal server error'};

            return callback(output);

        }
    );

}

module.exports.getCategories = getCategories;