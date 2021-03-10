const http = require('http');
const url = require('url');
const fs = require('fs');

http.createServer(function(req, res){

    var method = req.method;
    var current_url = new URL(req.protocol + '://' + req.host + req.url);
    var pathname = current_url.pathname;
    var query_params = current_url.searchParams;
    var route_params =  pathname.split("/");

    res.setHeader('Content-Type' , 'application/json');

    if(method == 'GET'){

        if(pathname == '/categories'){

            var controller = require('./controllers/category');
            
            controller.getCategories((output) => {

                res.statusCode = output.statusCode;
                res.write(JSON.stringify(output.data));
                res.end();

            });
        
        }else if(route_params[1] == 'products'){

            var controller = require('./controllers/product');

            if(route_params.length > 2 && route_params[2].trim() != ''){

                var id = route_params[2];

                controller.getProduct(id, (output) => {

                    res.statusCode = output.statusCode;
                    res.write(JSON.stringify(output.data));
                    res.end();

                });
            
            }else{

                controller.getAllProducts((output) => {

                    res.statusCode = output.statusCode;
                    res.write(JSON.stringify(output.data));
                    res.end();

                });

            }
        
        }else{

            res.statusCode = 400;
            res.end(JSON.stringify({'error' : 'Bad request'}));

        }

    }else if(method == 'POST'){

        if(pathname == '/categories'){

            data = '';

            if(query_params.has('data')){

                data = query_params.get('data');

            }

            var controller = require('./controllers/category');
            
            controller.addCategory(data, (output) => {

                res.statusCode = output.statusCode;
                res.write(JSON.stringify(output.data));
                res.end();

            });

            
        }else if(pathname == '/products'){
            
            data = '';

            if(query_params.has('data')){

                data = query_params.get('data');

            }

            var controller = require('./controllers/product');
            
            controller.addProduct(data, (output) => {

                res.statusCode = output.statusCode;
                res.write(JSON.stringify(output.data));
                res.end();

            });
        
        }else{

            res.statusCode = 400;

            res.end(JSON.stringify({'error' : 'Bad request'}));

        }

    }else if(method == 'PUT'){

        if(route_params[1] == 'categories'){

            if(route_params.length > 2 && route_params[2].trim() != ''){

                data = '';

                var id = route_params[2];

                if(query_params.has('data')){
    
                    data = query_params.get('data');
    
                }
    
                var controller = require('./controllers/category');
                
                controller.replaceCategory(id, data, (output) => {
    
                    res.statusCode = output.statusCode;
                    res.write(JSON.stringify(output.data));
                    res.end();
    
                });
            
            }else{

                res.statusCode = 405;
                res.write(JSON.stringify({'error': 'Method not allowed'}));
                res.end();

            }
        
        }else if(route_params[1] == 'products'){

            if(route_params.length > 2 && route_params[2].trim() != ''){

                data = '';

                var id = route_params[2];

                if(query_params.has('data')){
    
                    data = query_params.get('data');
    
                }
    
                var controller = require('./controllers/product');
                
                controller.replaceProduct(id, data, (output) => {
    
                    res.statusCode = output.statusCode;
                    res.write(JSON.stringify(output.data));
                    res.end();
    
                });
            
            }else{

                res.statusCode = 405;
                res.write(JSON.stringify({'error': 'Method not allowed'}));
                res.end();

            }
        
        }else{

            res.statusCode = 400;
            res.end(JSON.stringify({'error' : 'Bad request'}));

        }

    }else if(method == 'PATCH'){

        if(route_params[1] == 'categories'){

            if(route_params.length > 2 && route_params[2].trim() != ''){

                data = '';

                var id = route_params[2];

                if(query_params.has('data')){
    
                    data = query_params.get('data');
    
                }
    
                var controller = require('./controllers/category');
                
                controller.updateCategory(id, data, (output) => {
    
                    res.statusCode = output.statusCode;
                    res.write(JSON.stringify(output.data));
                    res.end();
    
                });
            
            }else{

                res.statusCode = 405;
                res.write(JSON.stringify({'error': 'Method not allowed'}));
                res.end();

            }
        
        }else if(route_params[1] == 'products'){

            if(route_params.length > 2 && route_params[2].trim() != ''){

                data = '';

                var id = route_params[2];

                if(query_params.has('data')){
    
                    data = query_params.get('data');
    
                }
    
                var controller = require('./controllers/product');
                
                controller.updateProduct(id, data, (output) => {
    
                    res.statusCode = output.statusCode;
                    res.write(JSON.stringify(output.data));
                    res.end();
    
                });
            
            }else{

                res.statusCode = 405;
                res.write(JSON.stringify({'error': 'Method not allowed'}));
                res.end();

            }
        
        }else{

            res.statusCode = 400;
            res.end(JSON.stringify({'error' : 'Bad request'}));

        }

    }else if(method == 'DELETE'){


        if(route_params[1] == 'categories'){

            if(route_params.length > 2 && route_params[2].trim() != ''){

                var id = route_params[2];

                var controller = require('./controllers/category');
                
                controller.deleteCategory(id, (output) => {
    
                    res.statusCode = output.statusCode;
                    res.write(JSON.stringify(output.data));
                    res.end();
    
                });
            
            }else{

                res.statusCode = 405;
                res.write(JSON.stringify({'error': 'Method not allowed'}));
                res.end();

            }
        
        }else if(route_params[1] == 'products'){

            if(route_params.length > 2 && route_params[2].trim() != ''){

                var id = route_params[2];

                var controller = require('./controllers/product');
                
                controller.deleteProduct(id, (output) => {
    
                    res.statusCode = output.statusCode;
                    res.write(JSON.stringify(output.data));
                    res.end();
    
                });
            
            }else{

                res.statusCode = 405;
                res.write(JSON.stringify({'error': 'Method not allowed'}));
                res.end();

            }
        
        }else{

            res.statusCode = 400;
            res.end(JSON.stringify({'error' : 'Bad request'}));

        }

    }

}) . listen(8000);