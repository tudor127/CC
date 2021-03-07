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

function validateCategory(data){

    var res = {};
    res.success = true;
    res.errors = [];

    try {

        data = JSON.parse(data);

        if(data.hasOwnProperty('status')){

            if(parseInt(data.status) != 0 && parseInt(data.status) != 1){

                res.errors.push({'field' : 'status', 'error' : 'status must be 0 or 1'});

            }

        }else{

            res.errors.push({'field' : 'status', 'error' : 'status is missing'});

        }

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