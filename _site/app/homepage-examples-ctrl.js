angular.module('famous-angular')

.controller('homepageExamplesCtrl', function($scope) {

  $scope.options = {
    grid: {
      dimensions: [2, 2]
    }
  };

  $scope.squares = _.map(_.range(0, 4), function(index) {
    return { x: translateSquare(index) };
  });

  function translateSquare(index) {
    return (index || 0) * 75;
  }

  $scope.modifiers     = [0, 1, 2];

  $scope.data = {
    rangeValue: 0,
    repeatedItems: 1
  };

  $scope.translateX = function(rangeValue) {
    var sliderWidth = 300;
    var leftOffset = -20;
    if (!rangeValue) {
      return 0 + leftOffset;
    }
    return ((Number(rangeValue) / 100) * sliderWidth) + leftOffset;
  };

  $scope.$watch('data.repeatedItems', function(value) {
    $scope.modifiers = _.range(0, value);
  });

});
