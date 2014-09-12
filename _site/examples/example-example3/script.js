angular.module('faGridExampleApp', ['famous.angular'])
    .controller('GridCtrl', ['$scope', function($scope) {

      $scope.myGridLayoutOptions = {
         dimensions: [2,2], // specifies number of columns and rows
      };

      $scope.grids = [{bgColor: "orange"}, {bgColor: "red"}, {bgColor: "green"}, {bgColor: "yellow"}];

  }]);