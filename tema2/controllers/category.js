var model = require('../models/category');

function getCategories(callback){

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

function addCategory(data, callback){

    var output = {};

    var validation = validateCategory(data);

    if(!validation.success){

        output.statusCode = 400;
        output.data = validation;

        return callback(output);

    }else{

        data = JSON.parse(data);

        model.addCategory(data, (code) => {

            if(code == 1){

                output.statusCode = 201;
                output.data = {'message' : 'Category created'};

            }else if(code == 2){

                output.statusCode = 409;
                output.data = {'error' : 'Category with name ' + data.name + ' already exists'};

            }else{

                output.statusCode = 500;
                output.data = {'error' : 'Internal server error'};

            }

            return callback(output);

        });

    }

}

function updateCategory(id, data, callback){

    var output = {};

    var validation = validateCategory(data);

    if(!validation.success){

        output.statusCode = 400;
        output.data = validation;

        return callback(output);

    }else{

        data = JSON.parse(data);

        model.updateCategory(id, data, (code) => {

            if(code == 1){

                output.statusCode = 200;
                output.data = {'message' : 'Category updated'};

            }else if(code == 2){

                output.statusCode = 404;
                output.data = {'error' : 'Category not found'};

            }else{

                output.statusCode = 500;
                output.data = {'error' : 'Internal server error'};

            }

            return callback(output);

        });

    }

}

function deleteCategory(id, callback){

    var output = {};

    model.deleteCategory(id, (code) => {

        if(code == 1){

            output.statusCode = 200;
            output.data = {'message' : 'Category deleted'};

        }else if(code == 2){

            output.statusCode = 404;
            output.data = {'error' : 'Category not found'};

        }else{

            output.statusCode = 500;
            output.data = {'error' : 'Internal server error'};

        }

        return callback(output);

    });

}

function validateCategory(data){

    var res = {};
    res.success = true;
    res.errors = [];

    try {

        data = JSON.parse(data);

        if(data.hasOwnProperty('name')){

            if(data.name.length < 3){

                res.errors.push({'field' : 'name', 'error' : 'name must contain at least 3 characters'});

            }
        }else{

            res.errors.push({'field' : 'name', 'error' : 'name is missing'});

        }

    } catch(err){

        res.errors.push({'error' : 'Invalid format'});

    }

    if(res.errors.length > 0){
        
        res.success = false;

    }

    return res;
}

module.exports.getCategories = getCategories;
module.exports.addCategory = addCategory;
module.exports.updateCategory = updateCategory;
module.exports.deleteCategory = deleteCategory;