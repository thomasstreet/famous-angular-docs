angular.module('controller.homepage', ['famous.angular'])
  .controller('homepageExamplesCtrl', function($scope) {

    $scope.testArray = [
      100, 200, 250, 300,
      350, 450, 500, 600
    ];
    $scope.data = {
      distance: 200
    };

    var _width = 320;
    var _height = 568;

    $scope.options = {
      grid: {
        dimensions: [2, 2]
      }
    }; 

    $scope.sizes = {
      gridSurfaces: [$scope.data.distance, undefined]
    };

    $scope.squares = [0, 100, 200, 300];

    $scope.translateX = 200;

  })
;
