angular.module('faFlipperExampleApp', ['famous.angular'])
    .controller('FlipperCtrl', ['$scope', '$famous', function($scope, $famous) {
      $scope.flipIt = function() {
         $famous.find('fa-flipper')[0].flip();
      };
  }]);