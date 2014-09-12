angular.module('faModifierExampleApp', ['famous.angular'])
    .controller('ModifierCtrl', ['$scope', function($scope) {

      $scope.boxObject = {
         origin: [.4, .4],
         size: [50, 50]
      };

  }]);