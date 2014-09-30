angular.module('famous-angular')

.controller('state3Ctrl', function($scope, $interval, $famous, $timeline, stateTransitions) {

  var Transitionable = $famous['famous/transitions/Transitionable'];
  var Easing = $famous['famous/transitions/Easing'];

  var t = new Transitionable(0);
  $scope.t = t;

  var tile = {
    width: 300,
    height: 115,
    margin: {
      left: 10,
      bottom: 10
    },
    countPerColumn: 4,
    columnCount: 2
  };
  $scope.tile = tile;

  var tileGrid = {
    margin: {
      left: 30
    }
  };
  $scope.tileGrid = tileGrid;

/*--------------------------------------------------------------*/

  $scope.enter = function($done) {
    stateTransitions.enter(t, function() {
      playAnimation();
      $done();
    });
  };

  function playAnimation() {
    var repeatAutoplay = $interval(function() {
      if ($scope.data.repeatCount + 1 >= 9) {
        $interval.cancel(repeatAutoplay);
        return;
      }
      $scope.data.repeatCount++;
    }, 100);
  }

  $scope.leave = function($done) {
    stateTransitions.leave(t, $done);
  };

  $scope.entireView = {
    translate: $timeline([
      [0, [0, 0, 0]],
      [1, [0, 0, 0], Easing.inQuart],
      [2, [0, 0, 150]],
    ]),
    opacity: $timeline([
      [0, 0],
      [0.3, 1],
      [1, 1],
      [2, 0],
    ])
  };

/*--------------------------------------------------------------*/

  $scope.catTileGrid = {
    translate: $timeline([
      [0, [980, 180, 0], Easing.inOutQuart],
      [0.2, [980, 180, 0]]
    ]),
    opacity: $timeline([
      [0, 0, Easing.inOutQuart],
      [0.2, 1]
    ])
  };

  $scope.faAppHeight = function() {
    var totalHeight = tile.height + tile.margin.bottom;
    return (totalHeight * tile.countPerColumn);
  };

  $scope.content = {
    translate: $timeline([
      [0, [250, 200, 0], Easing.inOutQuart],
      [0.2, [250, 160, 0]]
    ])
  };

  $scope.code = {
    translate: $timeline([
      [0.2, [0, 200, 0], Easing.inOutQuart],
      [0.3, [0, 150, 0]]
    ])
  };

  $scope.repeatSlider = {
    width: (tile.width * tile.columnCount) + tile.margin.left,
    height: 60,
    translate: function() {
      var totalTileHeight = tile.height + tile.margin.bottom;
      var heightOfAllTiles = totalTileHeight * tile.countPerColumn;
      return $timeline([
        [0, [tileGrid.margin.left, heightOfAllTiles + 100, 0], Easing.outBounce],
        [0.2, [tileGrid.margin.left, heightOfAllTiles, 0]]
      ]);
    }()
  };

/*--------------------------------------------------------------*/

  $scope.data = {
    repeatCount: 0
  };

  $scope.cats = [];

  $scope.$watch('data.repeatCount', function(newVal, oldVal) {
    if (newVal) {
      $scope.cats = [];
      for (var i = 0; i < Number(newVal); i++) {
        $scope.cats.push(catData[i]);
      }
    }
  });

  $scope.catTile = {
    translate: function(catT, $index) {
      var totalWidth = tile.width + tile.margin.left;
      var x = $index >= tile.countPerColumn ? totalWidth : 0;

      var totalHeight = tile.height + tile.margin.bottom;
      var y = ($index % tile.countPerColumn) * totalHeight;

      var z = 0;

      return [x, y, z];
    },
    rotateX: $timeline([
      [0, -Math.PI / 2, Easing.outElastic],
      [0.99, 0, Easing.inQuart],
      [1.99, -Math.PI / 2]
    ])
  };

  $scope.catEnter = function(t, $done) {
    t.set(1, { duration: 1500 }, $done);
  };

  $scope.catLeave = function(t, $done) {
    t.halt();
    t.set(2, { duration: 100 }, function() {
      t.set(0, { duration: 1 });
      $done();
    });
  };

/*--------------------------------------------------------------*/

  var catData = [
    {
      picture: 'img/cats/cat1.png',
      name: 'Rocco',
      location: 'Seattle, WA',
      t: new Transitionable(0)
    },
    {
      picture: 'img/cats/cat2.png',
      name: 'Tabby',
      location: 'Phoenix, AR',
      t: new Transitionable(0)
    },
    {
      picture: 'img/cats/cat3.png',
      name: 'Meiska',
      location: 'Reston, VA',
      t: new Transitionable(0)
    },
    {
      picture: 'img/cats/cat4.png',
      name: 'Fat Max',
      location: 'San Francisco, CA',
      t: new Transitionable(0)
    },
    {
      picture: 'img/cats/cat5.png',
      name: 'Izzy',
      location: 'Atlanta, GA',
      t: new Transitionable(0)
    },
    {
      picture: 'img/cats/cat6.png',
      name: 'Powder',
      location: 'Seattle, WA',
      t: new Transitionable(0)
    },
    {
      picture: 'img/cats/cat7.png',
      name: 'David',
      location: 'Salem, OR',
      t: new Transitionable(0)
    },
    {
      picture: 'img/cats/cat8.png',
      name: 'Maggie',
      location: 'Sarasota, FL',
      t: new Transitionable(0)
    }
  ];

});
