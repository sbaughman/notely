'use strict';

var nevernoteBasePath = 'http://nevernote-1150.herokuapp.com/api/v1/';
var apiKey = '$2a$10$mvUpe1bncgMjE0ciIl44VelGql7pcX1vCOc7Zif0Bmi1LFfdHutSa';

angular.module('notely.notes', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/notes', {
    templateUrl: 'notes/notes.html'
  });
}])

.controller('NotesController', ['$scope', '$http', function($scope, $http) {
  $http.get(nevernoteBasePath + 'notes?api_key=' + apiKey)
    .success(function(notesData) {
      $scope.notes = notesData;
    });

    $scope.commit = function() {
      $http.post(nevernoteBasePath + 'notes', {
        api_key: apiKey,
        note: {
          title: 'Test Title',
          body_html: 'Whoever wrote this API must be a person'
        }
      })
        .success(function(newNoteData){
          console.log('Saved');
          console.log(newNoteData);
        });
    };
}]);
