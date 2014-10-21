angular.module('faInputExampleApp', ['famous.angular'])
    .controller('ClickCtrl', ['$scope', function($scope) {
      $scope.clicked = 0;
      $scope.myClickHandler = function($event) {
        console.log($event);
        $scope.clicked++;
      };
  }]);