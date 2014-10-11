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

  $scope.entireView = {
    translate: function() {
      return [0, 750, 0]; 
    }
  };

  $scope.showDownloadButton = function() {
    return $media.$query('sm');
  }

/*--------------------------------------------------------------*/

  $media.$sheet('DownloadPanelSheet', {

    xs: {
      '#download-panel': {
        transform: function() {
          var translate = [0, 1050, 0];
          return Transform.translate.apply(this, translate);
        },
        origin: function() {
          return [0.5, 0];
        }
      },
      '#cdn': {
        transform: function() {
          var translate = [60, 350, 2];
          return Transform.translate.apply(this, translate);
        }
      },
      //'#right-column': {
        //transform: function() {
          //var translate = $timeline([
            //[0, [85, 620, 0]],
          //])(t.get());
          //return Transform.translate.apply(this, translate);
        //},
      //}
    },

    sm: {
      '#download-panel': {
        transform: function() {
          var translate = [0, 750, 0];
          return Transform.translate.apply(this, translate);
        }
      },
      '#cdn': {
        transform: function() {
          var translate = [245, 350, 2];
          return Transform.translate.apply(this, translate);
        }
      },
      //'#right-column': {
        //transform: function() {
          //var translate = $timeline([
            //[0, [1050, 190, 0]],
          //])(t.get());
          //return Transform.translate.apply(this, translate);
        //},
      //}
    }

  });

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
