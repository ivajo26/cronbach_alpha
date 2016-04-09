var express = require('express'),
    http = require('http'),
    path = require('path'),
    bodyParser = require('body-parser');

var app = module.exports = express();
app.set('view engine', 'jade');
app.use(express.static(path.join(__dirname, 'client')));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.get('/*', function (req, res) {
  res.render('index');
});

app.post('/simulate', function(req, res) {
  console.log(req.body);
});

app.set('port', process.env.PORT || 8000);
http.createServer(app).listen(app.get('port'), function(){
    console.log("Express server listening on port " + app.get('port'));
});
