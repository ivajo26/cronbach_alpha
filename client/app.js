'use strict';

var app = angular.module('Cronbach', ['ngMaterial']);

app.controller('Simulator', function($scope, $http) {
  $scope.questions;
  $scope.surveys;
  $scope.simulate = function(){
      $scope.alpha = 0;
      $http.post('/simulate', { 'questions': $scope.questions, 'surveys': $scope.surveys})
      .success(function(data){
        $scope.matrix = data.matrix;
        $scope.alpha = data.alpha;
        $scope.intents = data.intents;
      });
      $scope.questions = '';
      $scope.surveys = '';

  }
});
