var model = require('../models/product');

function getProduct(id, callback){

    var output = {};

    if(isNaN(id)){

        output.statusCode = 404;
        output.data = {'error': 'Not found'};

        return callback(output);

    }else{

        id = parseInt(id);

        model.getProduct(id).then(
            
            (result) => {

                if(result.length > 0){

                    var product = result[0];
                    output.statusCode = 200;
                    output.data = product;

                }else{

                    output.statusCode = 404;
                    output.data = {'error' : 'Not found'};

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

    var output = {};

    model.getAllProducts().then(
        
        (results) => {

            if(results.length > 0){

                output.data = [];

                for(let i=0; i<results.length; i++){

                    var product = results[i];
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


function addProduct(data, callback){

    var output = {};

    var validation = validateProduct(data);

    if(!validation.success){

        output.statusCode = 400;
        output.data = validation;

        return callback(output);

    }else{

        data = JSON.parse(data);

        model.addProduct(data, (code) => {

            if(code == 1){

                output.statusCode = 201;
                output.data = {'message' : 'Product created'};

            }else if(code == 2){

                output.statusCode = 409;
                output.data = {'error' : 'Product with name ' + data.name + ' already exists'};

            }else{

                output.statusCode = 500;
                output.data = {'error' : 'Internal server error'};

            }

            return callback(output);

        });

    }

}

function replaceProduct(id, data, callback){

    var output = {};

    var validation = validateProduct(data);

    if(!validation.success){

        output.statusCode = 400;
        output.data = validation;

        return callback(output);

    }else{

        data = JSON.parse(data);

        model.replaceProduct(id, data, (code) => {

            if(code == 1){

                output.statusCode = 200;
                output.data = {'message' : 'Product replaced'};

            }else if(code == 2){

                output.statusCode = 404;
                output.data = {'error' : 'Product not found'};

            }else{

                output.statusCode = 500;
                output.data = {'error' : 'Internal server error'};

            }

            return callback(output);

        });

    }

}


function updateProduct(id, data, callback){

    var output = {};

    var validation = partiallyValidateProduct(data);

    if(!validation.success){

        output.statusCode = 400;
        output.data = validation;

        return callback(output);

    }else{

        data = JSON.parse(data);

        model.updateProduct(id, data, (code) => {

            if(code == 1){

                output.statusCode = 200;
                output.data = {'message' : 'Product updated'};

            }else if(code == 2){

                output.statusCode = 404;
                output.data = {'error' : 'Product not found'};

            }else{

                output.statusCode = 500;
                output.data = {'error' : 'Internal server error'};

            }

            return callback(output);

        });

    }

}

function deleteProduct(id, callback){

    var output = {};

    model.deleteProduct(id, (code) => {

        if(code == 1){

            output.statusCode = 200;
            output.data = {'message' : 'Product deleted'};

        }else if(code == 2){

            output.statusCode = 404;
            output.data = {'error' : 'Product not found'};

        }else{

            output.statusCode = 500;
            output.data = {'error' : 'Internal server error'};

        }

        return callback(output);

    });

}

function validateProduct(data){

    var res = {};
    res.errors = [];

    try{

        data = JSON.parse(data);
        
        if(data.hasOwnProperty('price')){

            if(isNaN(data.price)){

                res.errors.push({'field' : 'price', 'error' : 'price is not valid'});

            }
        }else{

            res.errors.push({'field' : 'price', 'error' : 'price is missing'});

        }

        if(data.hasOwnProperty('stock')){

            if(isNaN(data.stock)){

                res.errors.push({'field' : 'stock', 'error' : 'stock is not valid'});

            }
        }else{

            res.errors.push({'field' : 'stock', 'error' : 'stock is missing'});

        }

        if(data.hasOwnProperty('category')){

            if(isNaN(data.category)){

                res.errors.push({'field' : 'category', 'error' : 'category is not valid'});

            }
        }else{

            res.errors.push({'field' : 'category', 'error' : 'category is missing'});

        }

        if(data.hasOwnProperty('name')){

            if(data.name.length < 3){

                res.errors.push({'field' : 'name', 'error' : 'name must contain at least 3 characters'});

            }
        }else{

            res.errors.push({'field' : 'name', 'error' : 'name is missing'});

        }

        if(data.hasOwnProperty('description')){

            if(data.description.length < 10){

                res.errors.push({'field' : 'description', 'error' : 'description must contain at least 10 characters'});

            }
        }else{

            res.errors.push({'field' : 'description', 'error' : 'description is missing'});

        }

    }catch{

        res.errors.push({'error' : 'Invalid format'});

    }

    if(res.errors.length > 0){
        
        res.success = false;

    }else{

        res.success = true;

    }

    return res;
    
}


function partiallyValidateProduct(data){//price & stock

    var res = {};
    res.errors = [];

    try{

        data = JSON.parse(data);
        
        if(data.hasOwnProperty('price')){

            if(isNaN(data.price)){

                res.errors.push({'field' : 'price', 'error' : 'price is not valid'});

            }
        }else{

            res.errors.push({'field' : 'price', 'error' : 'price is missing'});

        }

        if(data.hasOwnProperty('stock')){

            if(isNaN(data.stock)){

                res.errors.push({'field' : 'stock', 'error' : 'stock is not valid'});

            }
        }else{

            res.errors.push({'field' : 'stock', 'error' : 'stock is missing'});

        }

    }catch{

        res.errors.push({'error' : 'Invalid format'});

    }

    if(res.errors.length > 0){
        
        res.success = false;

    }else{

        res.success = true;

    }

    return res;
    
}

module.exports.getProduct = getProduct;
module.exports.getAllProducts = getAllProducts;
module.exports.addProduct = addProduct;
module.exports.replaceProduct = replaceProduct;
module.exports.updateProduct = updateProduct;
module.exports.deleteProduct = deleteProduct;