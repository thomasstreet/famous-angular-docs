angular.module('famous-angular')

.directive('downloadPanel', function() { 
  return {
    scope: false,
    restrict: 'E',
    controller: 'DownloadPanelCtrl',
    templateUrl: 'build/templates/download-panel.html'
  };
})

.controller('DownloadPanelCtrl', function($scope, $http, $famous, $timeline, stateTransitions, $media) {
  var Transform = $famous['famous/core/Transform'];

  $scope.minified = true;

  $scope.toggleMinified = function() {
    $scope.minified = !$scope.minified;
  };

  $scope.jsCDN = function() {
    return $scope.minified ? js.minified : js.unminified;
  };

  $scope.cssCDN = function() {
    return $scope.minified ? css.minified : css.unminified;
  };

  var js = {
    minified: 'http://code.famo.us/famous-angular/latest/famous-angular.min.js',
    unminified: 'http://code.famo.us/famous-angular/latest/famous-angular.js'
  };

  var css = {
    minified: 'http://code.famo.us/famous-angular/latest/famous-angular.min.css',
    unminified: 'http://code.famo.us/famous-angular/latest/famous-angular.css'
  };

/*--------------------------------------------------------------*/

  $media.$sheet('DownloadPanelSheet', {

    xs: {
      '#download-panel': {
        transform: function() {
          var translate = [0, 660, 0];
          return Transform.translate.apply(this, translate);
        },
      },
    },

    sm: {
      '#download-panel': {
        transform: function() {
          var translate = [0, 560, 0];
          return Transform.translate.apply(this, translate);
        }
      },
    }

  });

});
