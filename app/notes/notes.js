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
  $scope.notes = [];
  // call fetchNotes function with callback so that it returns a populated 'notes' array
  NotesBackend.fetchNotes(function(notesData) {
    $scope.notes = notesData;
  });

  $scope.commit = function() {
    // call postNote function with callback
    NotesBackend.postNote($scope.note, function(notesData) {
      $scope.notes = notesData;
    });
  };

  $scope.hasNotes = function() {
    return $scope.notes.length > 0;
  };

  $scope.loadNote = function(note) {
    $scope.note = self.cloneNote(note);
  };
}]);
