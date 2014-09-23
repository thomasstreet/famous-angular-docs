angular.module('famous-angular')

.run(function($rootScope) {
    var RESOLUTION = {
      WIDTH: 1920,
      HEIGHT: 1080
    };

    var NAVBAR = {
      HEIGHT: 100
    };

    $rootScope.viewportScale = function() {
      var xScale, yScale;

      var viewport = {
        height: window.innerHeight - NAVBAR.HEIGHT,
        width: window.innerWidth
      };

      if (viewport.height < RESOLUTION.HEIGHT) {
        yScale = viewport.height / RESOLUTION.HEIGHT;
        yScale = yScale.toFixed(2);
      } else {
        yScale = 1;
      }

      if (viewport.width < RESOLUTION.WIDTH) {
        xScale = viewport.width / RESOLUTION.WIDTH;
        xScale = xScale.toFixed(2);
      } else {
        xScale = 1;
      }

      // Use whichever scale is smaller
      var smallestScale = xScale < yScale ? xScale : yScale;

      return [smallestScale, smallestScale];
    };

    // Set the left offset based upon the scale amount, to re-center the fa-app
    function setLeftOffset() {
      var scale = $rootScope.viewportScale()[0];

      var leftOffset = ((1 - scale) / 2) * window.innerWidth;
    
      $('#fa-app').css('left', leftOffset);
    }

    setLeftOffset();
});
