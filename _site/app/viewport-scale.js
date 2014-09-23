angular.module('famous-angular')

.run(function($rootScope) {
    var NAVBAR = {
      HEIGHT: 100
    };

    var RESOLUTION = {
      WIDTH: 1920,
      HEIGHT: 1080 - NAVBAR.HEIGHT
    };

    setLeftOffset();
    window.onresize = setLeftOffset;

    // Set the left offset based upon the scale amount, to re-center the fa-app
    function setLeftOffset() {
      var scale = getViewportScale();

      var leftOffset = (window.innerWidth / 2) - (scale * RESOLUTION.WIDTH / 2);
    
      $('#fa-app').css('-webkit-transform', 'scale(' + scale + ', ' + scale + ')');
      $('#fa-app').css('-webkit-transform-origin', '0 0');
      $('#fa-app').css('left', Math.floor(leftOffset));
    }

    function getViewportScale() {
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

      var smallestScale = xScale < yScale ? xScale : yScale;

      return smallestScale;
    };
});
