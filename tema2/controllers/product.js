
function getProduct(id, callback){

    var model = require('../models/product');

    var output = {};

    if(isNaN(id)){

        output.statusCode = 400;
        output.data = {'error': 'Bad request'};

        return callback(output);

    }else{

        id = parseInt(id);

        model.getProduct(id).then(
            
            (result) => {

                if(result.length > 0){

                    var product = result[0];
                    product.image = 'http://localhost:8000/img/' + product.image;
                    output.statusCode = 200;
                    output.data = product;

                }else{

                    output.statusCode = 404;
                    output.data = {'error' : 'Resource not found'};

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

}

function getAllProducts(callback){

    var model = require('../models/product');

    var output = {};

    model.getAllProducts().then(
        
        (results) => {

            if(results.length > 0){

                output.data = [];

                for(let i=0; i<results.length; i++){

                    var product = results[i];
                    product.image = 'http://localhost:8000/img/' + product.image;
                    output.data.push(product);
                }

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

module.exports.getProduct = getProduct;
module.exports.getAllProducts = getAllProducts;