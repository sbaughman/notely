'use strict';

// Declare app level module which depends on views, and components
var app = angular.module('notely', [
  'ngRoute',
  'notely.notes',
  'notely.version',
]);

app.config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/notes'});
}]);

app.directive('focusOn', function() {
  return function(scope, el, attr) {
    scope.$on(attr.focusOn, function(ev) {
      el[0].focus();
    });
  };
});
