angular.module('famous-angular')

.controller('state3Ctrl', function($scope, $interval, $famous, $timeline, stateTransitions) {

  var Transitionable = $famous['famous/transitions/Transitionable'];
  var Easing = $famous['famous/transitions/Easing'];

  var t = new Transitionable(0);

  $scope.enter = function($done) {
    t.delay(stateTransitions.enterDelay);
    t.set(1, {duration: 4000}, $done);
  };

  $scope.leave = function($done) {
    t.halt();
    t.set(0, {duration: stateTransitions.leaveDuration}, $done);
  };

  $scope.content = {
    translate: function() {
      return $timeline([
        [0, [-1000, 0, 0], Easing.inOutQuart],
        [0.2, [0, 0, 0]]
      ])(t.get());
    }
  };

  $scope.code = {
    translate: function() {
      return $timeline([
        [0.2, [0, 1000, 0], Easing.inOutQuart],
        [0.3, [0, 100, 0]]
      ])(t.get());
    }
  };

  $scope.inputRange = {
    translate: function() {
      return $timeline([
        [0, [1000, 0, 0], Easing.inOutQuart],
        [0.2, [0, 320, 0]]
      ])(t.get());
    }
  };

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
      var x = $index >= 4 ? 205 : 0;
      var y = ($index % 4) * 80;
      var z = 0;
      return $timeline([
        [0.2, [x >= 4 ? x + 60 : x - 60, y, z], Easing.inQuart],
        [1, [x, y, z]]
      ])(catT.get());
    },
    opacity: function(catT, $index) {
      return catT.get();
    }
  };

  setTimeout(function() {
    var repeatAutoplay = $interval(function() {
      if ($scope.data.repeatCount + 1 >= 9) {
        $interval.cancel(repeatAutoplay);
        return;
      }
      $scope.data.repeatCount++;
    }, 50);
  }, 2000);

  $scope.catEnter = function(t, $done) {
    t.set(1, { duration: 300 }, $done);
  };

  $scope.catLeave = function(t, $done) {
    t.set(0, { duration: 300 }, $done);
  };

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
      location: 'Orlando, FL',
      t: new Transitionable(0)
    }
  ];

});
