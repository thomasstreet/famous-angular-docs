require.config({
  baseUrl: "/bower_components"
});

angular.module('famous-angular', ['controller.homepage', 'famous.angular']);

angular.module('controller.homepage', ['famous.angular'])
  .controller('homepageExamplesCtrl', function($scope) {

    $scope.options = {
      grid: {
        dimensions: [2, 2]
      }
    };

    $scope.squares = [
      { x: 0 }, { x: 75 }, { x: 150 }, { x: 225 }
    ];

    $scope.translateX = 50;

    $scope.showSquare = false;

    $scope.$watch('showSquare', function(value) {
      console.log(value);
      //$scope.showSquare = Boolean(value);
    });

  })
;
