angular.module('controller.homepage', ['famous.angular'])
  .controller('homepageExamplesCtrl', function($scope) {

    $scope.options = {
      grid: {
        dimensions: [2, 2]
      }
    };

    $scope.squares = [
      { x: 0 }, { x: 100 }, { x: 200 }, { x: 300 }
    ];

    $scope.translateX = 50;

  })
;
