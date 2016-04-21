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
  var intent = 0;
  var matrix, alpha;
  do {
    matrix = CreateMatrix(req.body.questions,req.body.surveys);
    alpha = CalcularAlpha(matrix, req.body.questions,req.body.surveys);
    intent += 1;
    console.log(intent);
  } while (alpha<0.8);
  res.json({ 'matrix': matrix, 'alpha': alpha, 'intents': intent });
});

app.set('port', process.env.PORT || 8001);
http.createServer(app).listen(app.get('port'), function(){
    console.log("Express server listening on port " + app.get('port'));
});

function Media(data) {
  var num = data.length,
      sum = 0;

  for (var i = 0; i < num; i++) {
      sum += data[i];
  }

  return sum/num
}

function Varianza(data) {
  var num = data.length,
  media = Media(data),
  sum = 0;

  for (var i = 0; i < num; i++) {
    sum += Math.pow((data[i]-media),2);
  }

  return sum/num;
}

function sumSi(matriz, numq, numi) {
  var varianzas = new Array(numq);
  for (var i = 0; i < numq; i++) {
    var itemq = new Array(numi);
    for (var j = 0; j < numi; j++) {
      itemq[j] = matriz[j][i];
    }
    varianzas[i] = Varianza(itemq);
  }
  var sum = 0;
  for (var i = 0; i < varianzas.length; i++) {
    sum += varianzas[i];
  }
  return sum;
}

function St(matriz, numq, numi) {
  var sumas = new Array(numi);
  for (var i = 0; i < numi; i++) {
    sumas[i] = 0;
    for (var j = 0; j < numq; j++) {
      sumas[i] += matriz[i][j];
    }
  }
  return Varianza(sumas);
}

function CalcularAlpha(matriz, numq, numi) {
  return (numi/(numi-1))*(1-(sumSi(matriz, numq, numi)/St(matriz, numq, numi)));
}

function CreateMatrix(questions, items){
  var matriz = [];
  for (var i = 0; i < items; i++) {
    matriz[i] = new Array(questions);
    for (var j = 0; j < questions; j++) {
      matriz[i][j] = Math.floor(Math.random() * (6 - 1)) + 1;
    }
  }
  return matriz;
}
