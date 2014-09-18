angular.module('faModifierExampleApp', ['famous.angular'])
    .controller('ModifierCtrl', ['$scope', function($scope) {

      $scope.myScopeSkewVariable = [0,0,.3];

      $scope.myScopeFunctionThatReturnsAnArray = function() {
        return [1.5, 1.5];
      };
  }]);