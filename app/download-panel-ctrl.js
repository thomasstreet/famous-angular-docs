angular.module('famous-angular')

.controller('downloadPanelCtrl', function($scope, $http, $famous, $timeline, stateTransitions, $media) {
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
    minified: 'https://code.famo.us/integrations/angular/2.0.2/famous-angular.min.js',
    unminified: 'https://code.famo.us/integrations/angular/2.0.2/famous-angular.js'
  };

  var css = {
    minified: 'https://code.famo.us/integrations/angular/2.0.2/famous-angular.min.css',
    unminified: 'https://code.famo.us/integrations/angular/2.0.2/famous-angular.css'
  };

/*--------------------------------------------------------------*/

  $media.$sheet('DownloadPanelSheet', {

    xs: {
      '#download-container': {
        transform: function() {
          var translate = [0, 310, 0];
          return Transform.translate.apply(this, translate);
        },
      },
      '#download-panel': {
        transform: function() {
          var translate = [0, 350, 0];
          return Transform.translate.apply(this, translate);
        },
      },
    },

    sm: {
      '#download-panel': {
        transform: function() {
          var translate = [0, 250, 0];
          return Transform.translate.apply(this, translate);
        }
      },
    }

  });

});
