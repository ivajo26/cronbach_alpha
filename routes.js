var path = require('path');

var routes = [
    {
        path: '/users',
        httpMethod: 'POST',
        middleware: [function(req, res) {

        }]
    },
    {
        path: '/*',
        httpMethod: 'GET',
        middleware: [function(req, res) {
            res.render('index');
        }]
    }
];
