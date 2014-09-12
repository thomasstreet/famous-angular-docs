angular.module('faGridExampleAppA', ['famous.angular'])
    .controller('GridCtrlA', ['$scope', function($scope) {

      $scope.myGridLayoutOptions = {
         dimensions: [2,2], // specifies number of columns and rows
      };

      $scope.grids = [{bgColor: "orange"}, {bgColor: "red"}, {bgColor: "green"}, {bgColor: "yellow"}];

  }]);