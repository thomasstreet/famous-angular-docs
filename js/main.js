angular.module('famous-angular', [
  'famous.angular',
  'ui.router'
]);

angular.module('docsApp', ['examples', 'bootstrap', 'bootstrapPrettify'])

  .controller('DocsController', [
    '$scope', 'openPlunkr',
    function($scope, openPlunkr) {
      $scope.openPlunkr = openPlunkr;
    }]);

angular.module('examples', [])

  .factory('formPostData', ['$document', function($document) {
    return function(url, fields) {
      /**
       * Form previously posted to target="_blank", but pop-up blockers were causing this to not work.
       * If a user chose to bypass pop-up blocker one time and click the link, they would arrive at
       * a new default plnkr, not a plnkr with the desired template.
       */
      var form = angular.element('<form style="display: none;" method="post" action="' + url + '"></form>');
      angular.forEach(fields, function(value, name) {
        var input = angular.element('<input type="hidden" name="' + name + '">');
        input.attr('value', value);
        form.append(input);
      });
      $document.find('body').append(form);
      form[0].submit();
      form.remove();
    };
  }])

  .factory('openPlunkr', ['formPostData', '$http', '$q', function(formPostData, $http, $q) {
    return function(exampleFolder) {

      var exampleName = 'AngularJS Example';

      // Load the manifest for the example
      $http.get(exampleFolder + '/manifest.json')
        .then(function(response) {
          return response.data;
        })
        .then(function(manifest) {
          var filePromises = [];

          // Build a pretty title for the Plunkr
          var exampleNameParts = manifest.name.split('-');
          exampleNameParts.unshift('AngularJS');
          angular.forEach(exampleNameParts, function(part, index) {
            exampleNameParts[index] = part.charAt(0).toUpperCase() + part.substr(1);
          });
          exampleName = exampleNameParts.join(' - ');

          var getFileName = function(filename, checkName) {
            if(filename.indexOf('/') !== -1) {
              filename = filename.substr(filename.lastIndexOf('/') + 1, filename.length);
            }

            if(checkName && manifest.files.indexOf(filename) !== -1) {
              filename = '_' + filename;
            }
            return filename;
          }

          var pushLocalFile = function(filename, checkName) {
            var deferred = $q.defer();
            $http.get(exampleFolder + '/' + filename, { transformResponse: [] })
              .then(function(response) {
                var innerFiles = [];
                filename = getFileName(filename, checkName);

                var reg = /<(?:script|link).*(?:src|href)="((?!(http|\/\/))(?:(?!").)+)"/gi;
                var localResources = reg.exec(response.data);
                while(localResources && localResources[1]) {
                  if(manifest.files.indexOf(localResources[1]) === -1) {
                    innerFiles.push(pushLocalFile(localResources[1]), true);
                    response.data = response.data.replace(localResources[1], getFileName(localResources[1], true));
                  }
                  localResources = reg.exec(response.data);
                }

                if(innerFiles.length > 0) {
                  $q.all(innerFiles).then(function(files) {
                    files = files || [];
                    files.push({
                      name: filename,
                      content: response.data
                    });
                    deferred.resolve(files);
                  });
                } else {
                  deferred.resolve({
                    name: filename,
                    content: response.data
                  });
                }
              }, function error() {
                deferred.reject();
              });
            return deferred.promise;
          }

          angular.forEach(manifest.files, function(filename) {
            filePromises.push(pushLocalFile(filename));
          });
          return $q.all(filePromises);
        })
        .then(function(files) {
          var postData = {};

          angular.forEach(files, function(filesList) {
            if(angular.isArray(filesList)) {
              angular.forEach(filesList, function(file) {
                postData['files[' + file.name + ']'] = file.content;
              });
            } else {
              postData['files[' + filesList.name + ']'] = filesList.content;
            }
          });

          postData['tags[0]'] = "angularjs";
          postData['tags[1]'] = "example";
          postData.private = true;
          postData.description = exampleName;

          formPostData('http://plnkr.co/edit/?p=preview', postData);
        });
    };
  }]);

angular.module('famous-angular')

.run(function($rootScope) {

  $rootScope.$on('$stateChangeStart', function(e, toState, toParams, fromState, fromParams) {

    // Make sure that fa-app contains the class for both the previous state
    // and current state, to ensure the correct CSS namespacing when
    // transitioning between views with fa-animate-enter/leave
    var classes = [
      toState.data.cssClass,
      (fromState && fromState.data) ? fromState.data.cssClass : ''
    ].join(' ');

    $rootScope.stateClasses = classes;
  });

});

angular.module('famous-angular')

.controller('homepageCtrl', function($scope) {

});

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

angular.module('famous-angular')

.run(function($rootScope, $famous, $timeline, $state) {
  $rootScope.bodyHeight = 5000;

  var rangePerState = 100;
  var stateCount = 7;
  var scrollStates = [
    { max: 100, name: 'intro' },
    { max: 200, name: '1' },
    { max: 300, name: '2' },
    { max: 400, name: '3' },
    { max: 500, name: '4' },
    { max: 600, name: '5' }
  ];

  var initialPageLoad = true;

  window.onscroll = function() {
    // Initial routing from page laod will set the scroll position, but 
    // don't want to execute handler for that scrollTo()
    if (!initialPageLoad) {
      var t = getTimelineFromScroll();
      determineState(t);
    }
  };

  function getTimelineFromScroll() {
    var pageYOffset = window.pageYOffset;
    var scrollMax = $rootScope.bodyHeight - window.innerHeight;

    // Scale the scroll range to a simple timeline of [0, n * 100]
    t = $timeline([
      [0, 0, function(x) { return x }],
      [scrollMax, (stateCount - 1) * rangePerState]
    ])(pageYOffset);

    return t;
  }

  function determineState(t) {
    for (var i = 0; i < scrollStates.length; i++) {
      var state = scrollStates[i];
      if (t < state.max) {
        $state.go(state.name);
        break;
      }
    }
  }

  $rootScope.$on('$stateChangeSuccess', function(e) {
    if (initialPageLoad) {
      determineScrollPositionFromState();
      initialPageLoad = false;
    }
  });


  function determineScrollPositionFromState() {
    var newState = $state.current;

    for (var i = 0; i < scrollStates.length; i++) {
      var state = scrollStates[i];
      if (newState.name === state.name) {

        // Set the scroll to slightly past the beginning of state range
        var beginningOfStateRange = state.max - rangePerState + 5;

        var scrollMax = $rootScope.bodyHeight - window.innerHeight;

        var newScrollY = $timeline([
          [0, 0, function(x) { return x }],
          [(stateCount - 1) * rangePerState, scrollMax]
        ])(beginningOfStateRange);

        window.scrollTo(0, newScrollY);
        break;
      }
    }
  }

});

angular.module('famous-angular')

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('intro', {
      url: '/intro',
      templateUrl: 'templates/state-intro.html',
      controller: 'stateIntroCtrl',
      data: {
        leaveAnimationDuration: 400,
        cssClass: 'state-intro'
      }
    })
    .state('1', {
      url: '/1',
      templateUrl: 'templates/state-1.html',
      controller: 'state1Ctrl',
      data: {
        leaveAnimationDuration: 600,
        cssClass: 'state-1'
      }
    })
    .state('2', {
      url: '/2',
      templateUrl: 'templates/state-2.html',
      controller: 'state2Ctrl',
      data: {
        leaveAnimationDuration: 600,
        cssClass: 'state-2'
      }
    })
    .state('3', {
      url: '/3',
      templateUrl: 'templates/state-3.html',
      controller: 'state3Ctrl',
      data: {
        leaveAnimationDuration: 1200,
        cssClass: 'state-3'
      }
    })
    .state('4', {
      url: '/4',
      templateUrl: 'templates/state-4.html',
      controller: 'state4Ctrl',
      data: {
        leaveAnimationDuration: 600,
        cssClass: 'state-4'
      }
    })
    .state('5', {
      url: '/5',
      templateUrl: 'templates/state-5.html',
      controller: 'state5Ctrl',
      data: {
        leaveAnimationDuration: 1200,
        cssClass: 'state-5'
      }
    });

    $urlRouterProvider.otherwise('intro');
})


;

angular.module('famous-angular')

.directive('square', function($famous) {
  var Transform = $famous['famous/core/Transform'];
  var Transitionable = $famous['famous/transitions/Transitionable'];
  var SnapTransition = $famous['famous/transitions/SnapTransition'];

  var flipOut = Transform.rotateZ(Math.PI / 2);
  var flipIn  = Transform.inverse(flipOut);

  return {
    restrict: 'A',
    priority: 3,
    link: function(scope, element, attrs) {

      function translateSquare(index) {
        return (index || 0) * 75;
      }

      var transform = new Transitionable(Transform.multiply(
        Transform.translate(translateSquare(scope.$index % 4), Math.floor(scope.$index / 4) * 60 + 40, 0),
        flipOut
      ));

      var opacity = new Transitionable(0);

      function enter() {
        transform.set(Transform.multiply(transform.get(), flipIn), {
          duration: 250,
          transition: SnapTransition
        });

        opacity.set(1, {duration: 250, curve: 'easeOut'});

        return 250;
      };

      function leave() {
        transform.set(Transform.multiply(transform.get(), flipOut), {
          duration: 250,
          transition: SnapTransition
        });

        opacity.set(0, {duration: 250, curve: 'easeIn'});

        return 250;
      };

      function halt() {
        scope.transform.halt();
      };

      angular.extend(scope, {
        enter: enter,
        leave: leave,
        halt: halt,
        opacity: opacity,
        transform: transform
      });
    }
  }
});

angular.module('famous-angular')

.controller('state1Ctrl', function($scope, $famous, $timeline, stateTransitions) {

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

  $scope.opacity = function() {
    return $timeline([
      [0, 0, Easing.inOutQuart],
      [1, 1]
    ])(t.get());
  };

  $scope.content = {
    translate: function() {
      return $timeline([
        [0, [-2000, 0, 0], Easing.inOutQuart],
        [0.2, [0, 0, 0]]
      ])(t.get());
    }
  };

  $scope.code = {
    frame: {
      translate: function() {
        return $timeline([
          [0.3, [0, 2000, 0], Easing.inOutQuart],
          [0.5, [0, 100, 0]]
        ])(t.get());
      }
    },

    header: {
      translate: function() {
        return $timeline([
          [0.4, [0, 2000, 0], Easing.inOutQuart],
          [0.6, [0, 120, 0]]
        ])(t.get());
      }
    },

    sidenav: {
      translate: function() {
        return $timeline([
          [0.5, [0, -2000, 0], Easing.inOutQuart],
          [0.7, [0, 140, 0]]
        ])(t.get());
      }
    },

    container: {
      translate: function() {
        return $timeline([
          [0.6, [-2000, 0, 0], Easing.inOutQuart],
          [0.8, [0, 160, 0]]
        ])(t.get());
      }
    },

    content: {
      translate: function() {
        return $timeline([
          [0.7, [-2000, 0, 0], Easing.inOutQuart],
          [0.9, [0, 180, 0]]
        ])(t.get());
      }
    }
  };


  $scope.example = {
    frame: {
      translate: function() {
        return $timeline([
          [0.3, [0, -2000, 0], Easing.inOutQuart],
          [0.5, [0, 0, 0]]
        ])(t.get());
      }
    },

    header: {
      translate: function() {
        return $timeline([
          [0.4, [0, -2000, 0], Easing.inOutQuart],
          [0.6, [20, 65, 0]]
        ])(t.get());
      }
    },

    sidenav: {
      translate: function() {
        return $timeline([
          [0.5, [0, 2000, 0], function(x) { return x }],
          [0.7, [20, 135, 0]]
        ])(t.get());
      }
    },

    container: {
      translate: function() {
        return $timeline([
          [0.6, [2000, 90, 0], function(x) { return x }],
          [0.8, [110, 135, 0]]
        ])(t.get());
      }
    },

    content: {
      translate: function() {
        return [135, 160, 0];
      },
      opacity: function() {
        return $timeline([
          [0.8, 0, Easing.inOutQuart],
          [1, 1]
        ])(t.get());
      },
      scale: function() {
        return $timeline([
          [0.7, [0.1, 0.1], Easing.inOutQuart],
          [1, [1, 1]]
        ])(t.get());
      }
    }
  };

});

angular.module('famous-angular')

.controller('state2Ctrl', function($scope, $famous, $timeline, stateTransitions) {

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

  $scope.data = {
    name: 'Angular',
    t: 1
  };

  $scope.rotate = function() {
    var rotate = $timeline([
      [1, 0, function(x) { return x }],
      [100, 2 * Math.PI]
    ])(parseInt($scope.data.t));
    return rotate;
  };

  $scope.content = {
    translate: function() {
      return $timeline([
        [0, [1000, 0, 0], Easing.inOutQuart],
        [0.2, [0, 0, 0]]
      ])(t.get());
    }
  };

  $scope.code = {
    frame: {
      translate: function() {
        return $timeline([
          [0.3, [0, 1000, 0], Easing.inOutQuart],
          [0.5, [0, 100, 0]]
        ])(t.get());
      }
    },
  };


  $scope.nametag = {
    translate: function() {
      return $timeline([
        [0, [-1000, 0, 0], Easing.inOutQuart],
        [0.2, [250, 150, 0]]
      ])(t.get());
    },

    body: {
      translate: function() {
        return [0, 0, 1];
      },
      opacity: function() {
        return $timeline([
          [0.8, 0, Easing.inOutQuart],
          [1, 1]
        ])(t.get());
      },
    },

    heading: {
      translate: function() {
        return [0, -115, 2];
      },
      opacity: function() {
        return $timeline([
          [0.8, 0, Easing.inOutQuart],
          [1, 1]
        ])(t.get());
      },
    },

    stripe: {
      translate: function() {
        return [0, 55, 3];
      },
      opacity: function() {
        return $timeline([
          [0.8, 0, Easing.inOutQuart],
          [1, 1]
        ])(t.get());
      },
    },

    name: {
      translate: function() {
        return [0, 35, 4];
      },
      opacity: function() {
        return $timeline([
          [0.8, 0, Easing.inOutQuart],
          [1, 1]
        ])(t.get());
      },
    },

    inputRange: {
      translate: function() {
        return [0, 410, 9999];
      },
      opacity: function() {
        return $timeline([
          [0.8, 0, Easing.inOutQuart],
          [1, 1]
        ])(t.get());
      },
    },

    inputText: {
      translate: function() {
        return [320, 410, 9999];
      },
      opacity: function() {
        return $timeline([
          [0.8, 0, Easing.inOutQuart],
          [1, 1]
        ])(t.get());
      },
    }

  };

});

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
    t.delay(stateTransitions.enterDelay);
    t.set(1, {duration: 4000}, $done);
  };

  $scope.leave = function($done) {
    t.halt();
    t.set(0, {duration: stateTransitions.leaveDuration}, $done);
  };

/*--------------------------------------------------------------*/

  $scope.catTileGrid = {
    translate: $timeline([
      [0, [1500, 0, 0], Easing.inOutQuart],
      [0.2, [950, 120, 0]]
    ]),
    opacity: $timeline([
      [0, 0, Easing.inOutQuart],
      [0.2, 1]
    ])
  };

  $scope.faAppHeight = function() {
    var totalHeight = tile.height + tile.margin.bottom;
    return (totalHeight * tile.countPerColumn) + $scope.repeatSlider.height;
  };

  $scope.content = {
    translate: $timeline([
      [0, [-1000, 0, 0], Easing.inOutQuart],
      [0.2, [0, 0, 0]]
    ])
  };

  $scope.code = {
    translate: $timeline([
      [0.2, [0, 1000, 0], Easing.inOutQuart],
      [0.3, [0, 100, 0]]
    ])
  };

  $scope.repeatSlider = {
    width: (tile.width * tile.columnCount) + tile.margin.left,
    height: 60,
    translate: function() {
      var totalTileHeight = tile.height + tile.margin.bottom;
      var heightOfAllTiles = totalTileHeight * tile.countPerColumn;
      return $timeline([
        [0, [1000, 0, 0], Easing.inOutQuart],
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

  // Automatically go through the slides
  setTimeout(function() {
    var repeatAutoplay = $interval(function() {
      if ($scope.data.repeatCount + 1 >= 9) {
        $interval.cancel(repeatAutoplay);
        return;
      }
      $scope.data.repeatCount++;
    }, 100);
  }, 2000);

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

angular.module('famous-angular')

.controller('state4Ctrl', function($scope, $famous, $timeline, stateTransitions) {

  var Transitionable = $famous['famous/transitions/Transitionable'];
  var Easing = $famous['famous/transitions/Easing'];

  var t = new Transitionable(0);
  $scope.t = t;

  $scope.enter = function($done) {
    t.delay(stateTransitions.enterDelay);
    t.set(1, {duration: 4000}, $done);
  };

  $scope.leave = function($done) {
    t.halt();
    t.set(0, {duration: stateTransitions.leaveDuration}, $done);
  };

  $scope.heading = {
    translate: $timeline([
      [0, [-2500, 0, 0], Easing.inOutQuart],
      [0.2, [0, 0, 0]]
    ])
  };


  $scope.routing = {
   image: {
     translate: $timeline([
       [0, [-1000, 0, 0], Easing.inOutQuart],
       [0.2, [180, 350, 0]]
     ])
   }, 
   text: {
     translate: $timeline([
       [0, [-1000, 0, 0], Easing.inOutQuart],
       [0.2, [310, 630, 0]]
     ])
   }, 
  };

  $scope.dependency = {
   image: {
     translate: $timeline([
       [0, [-1000, 0, 0], Easing.inOutQuart],
       [0.2, [740, 310, 0]]
     ])
   }, 
   text: {
     translate: $timeline([
       [0, [-1000, 0, 0], Easing.inOutQuart],
       [0.2, [740, 630, 0]]
     ])
   }, 
  };

  $scope.modules = {
   image: {
     translate: $timeline([
       [0, [-1000, 0, 0], Easing.inOutQuart],
       [0.2, [1290, 330, 0]]
     ])
   }, 
   text: {
     translate: $timeline([
       [0, [-1000, 0, 0], Easing.inOutQuart],
       [0.2, [1400, 630, 0]]
     ])
   }, 
  };

});

angular.module('famous-angular')

.controller('state5Ctrl', function($scope, $famous, $timeline, stateTransitions) {

  var Transitionable = $famous['famous/transitions/Transitionable'];
  var Easing = $famous['famous/transitions/Easing'];

  var t = new Transitionable(0);
  $scope.t = t;

  $scope.enter = function($done) {
    t.delay(stateTransitions.enterDelay);
    t.set(1, {duration: 4000}, $done);
  };

  $scope.leave = function($done) {
    t.halt();
    t.set(0, {duration: stateTransitions.leaveDuration}, $done);
  };

  $scope.webframe = {
    translate: $timeline([
      [0, [0, 1000, 0], Easing.inOutQuart],
      [0.2, [250, 180, 0]]
    ]),
    banner: {
      translate:$timeline([
        [0, [0, 1000, 0], Easing.inOutQuart],
        [0.2, [84, 110, 0]]
      ])
    }
  };

  $scope.content = {
    translate: $timeline([
      [0, [1000, 0, 0], Easing.inOutQuart],
      [0.2, [1170, 170, 0]]
    ])
  };

  $scope.code = {
    translate: $timeline([
      [0.3, [0, 1000, 0], Easing.inOutQuart],
      [0.5, [0, 150, 0]]
    ])
  };

});

angular.module('famous-angular')

.controller('stateIntroCtrl', function($scope, $famous, $timeline, stateTransitions) {
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

  $scope.opacity = function() {
    return $timeline([
      [0, 0, Easing.inOutQuart],
      [0.5, 1]
    ])(t.get());
  };

});

angular.module('famous-angular')

.factory('stateTransitions', function($rootScope, $state) {
  var prevState;

  $rootScope.$on('$stateChangeStart', function(e, toState, toParams, fromState, fromParams) {
    prevState = fromState;
  });

  return function() {
    return {
      enterDelay: function() {
        if (!prevState || !prevState.data) {
          return 0;
        }
        return prevState.data.leaveAnimationDuration;
      },
      leaveDuration: function() {
        return $state.current.data.leaveAnimationDuration;
      }
    }
  }
});
