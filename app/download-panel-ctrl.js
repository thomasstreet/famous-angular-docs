angular.module('famous-angular')

.controller('downloadPanelCtrl', function($scope, $http, $famous, $timeline, stateTransitions) {
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

  $scope.entireView = {
    translate: function() {
      return [0, 750, 0]; 
    }
  };


/*--------------------------------------------------------------*/

  $scope.container = {
    translate: function() {
      return [0, 310, 0]; 
    }
  };


  $scope.download = {
    text: {
      translate: function() {
        return [-465, 350, 1]; 
      }
    },
    button: {
      translate: function() {
        return [-465, 460, 2]; 
      }
    }
  };

  $scope.cdn = {
    translate: function() {
      return [245, 350, 2]; 
    }
  };

});
