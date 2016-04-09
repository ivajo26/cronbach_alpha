'use strict';

var app = angular.module('Cronbach', ['ngMaterial']);

app.controller('Simulator', function($scope, $http) {
  $scope.questions;
  $scope.surveys;
  $scope.simulate = function(){
    $http.post('/simulate', { 'questions': $scope.questions, 'surveys': $scope.surveys})
    // do {
    //   $scope.matrix = CreateMatrix($scope.questions,$scope.surveys);
    //   $scope.alpha = CalcularAlpha($scope.matrix, $scope.questions,$scope.surveys);
    // } while ($scope.alpha<0.8);

  }

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
