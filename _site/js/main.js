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

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('intro', {
      url: 'intro',
      templateUrl: 'templates/state-intro.html',
    })
    .state('1', {
      url: '1',
      templateUrl: 'templates/state-1.html',
      controller: 'state1Ctrl'
    });
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

.controller('state1Ctrl', function($scope, $famous, $timeline, scroll) {

  $('#state-1').css('opacity', 1);

  var Transitionable = $famous['famous/transitions/Transitionable'];
  var Easing = $famous['famous/transitions/Easing'];

  $scope.scroll = scroll;

  $scope.content = {
    translate: function() {
      return $timeline([
        [0, [-1000, 0, 0], Easing.inOutQuart],
        [30, [0, 0, 0]]
      ])($scope.scroll.get());
    }
  };

  $scope.frame = {
    translate: function() {
      return $timeline([
        [30, [0, -1000, 0], Easing.inOutQuart],
        [50, [0, 0, 0]]
      ])($scope.scroll.get());
    }
  };

  $scope.header = {
    translate: function() {
      return $timeline([
        [50, [0, -1000, 0], Easing.inOutQuart],
        [70, [10, 50, 0]]
      ])($scope.scroll.get());
    }
  };

  $scope.sidenav = {
    translate: function() {
      return $timeline([
        [70, [0, 1000, 0], Easing.inOutQuart],
        [99, [10, 90, 0]]
      ])($scope.scroll.get());
    }
  };

});

angular.module('famous-angular')

.controller('stateIntroCtrl', function($scope, $famous, $timeline, scroll) {
  var Transitionable = $famous['famous/transitions/Transitionable'];
  var Easing = $famous['famous/transitions/Easing'];

  var opacity = new Transitionable(0);

  $scope.opacity = function() {
    return opacity.get();
  };

  $scope.testEnter = function($done) {
    console.log('enter');
    $scope.opacity.set(1, {duration: 1000}, $done);
  };

  $scope.leave = function($done) {
    $scope.opacity.set(0, {duration: 1000}, $done);
  };

});

angular.module('famous-angular')

.run(function($rootScope, scroll) {
  $rootScope.bodyHeight = 5000;
})

.factory('scroll', function($rootScope, $famous, $timeline, $state) {
  console.log('scroll loaded');
  var Transitionable = $famous['famous/transitions/Transitionable'];
  var Easing = $famous['famous/transitions/Easing'];

  var scroll = 0;
  var rangePerState = 100;
  var stateCount = 7;

  window.onscroll = onscrollHandler;

  $state.go('intro');
  onscrollHandler();

  function onscrollHandler() {
    var pageYOffset = window.pageYOffset;
    var scrollMax = $rootScope.bodyHeight;

    // Scale the scroll range to a simple 0-1000 range
    scroll = $timeline([
      [0, 0, function(x) { return x }],
      [scrollMax, (stateCount - 1) * rangePerState]
    ])(pageYOffset);

    determineState(scroll);
  }

  function determineState(scroll) {
    if (scroll < 100) {
      $('#state-1').css('opacity', 0);
      $state.go('intro');
    } else if (scroll < 200) {
      $state.go('1');
    }
  }

  return {
    get: function() {
      // Only return values in a range of [0, rangePerState]
      return scroll % rangePerState;
    }
  };
});
