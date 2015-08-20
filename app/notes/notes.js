'use strict';

var nevernoteBasePath = 'http://nevernote-1150.herokuapp.com/api/v1/';
var apiKey = '$2a$10$mvUpe1bncgMjE0ciIl44VelGql7pcX1vCOc7Zif0Bmi1LFfdHutSa';

var noteApp = angular.module('notely.notes', ['ngRoute']);

noteApp.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/notes', {
    templateUrl: 'notes/notes.html'
  });
}]);

noteApp.controller('NotesController', ['$scope', 'NotesBackend', function($scope, NotesBackend) {
  var self = this;
  $scope.note = {};
  NotesBackend.fetchNotes(function(notesData) {
    $scope.notes = notesData;
  });

  $scope.commit = function() {
    NotesBackend.postNote($scope.note, function(notesData) {
      $scope.notes = notesData;
    });
  };
}]);
