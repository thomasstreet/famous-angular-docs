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
    
      $('#fa-app').css({
        '-webkit-transform' : 'scale(' + scale + ', ' + scale + ')',
        '-moz-transform'    : 'scale(' + scale + ', ' + scale + ')',
        '-ms-transform'     : 'scale(' + scale + ', ' + scale + ')',
        '-o-transform'      : 'scale(' + scale + ', ' + scale + ')',
        'transform'         : 'scale(' + scale + ', ' + scale + ')' 
      });
      $('#fa-app').css({
        '-webkit-transform-origin' : '0 0',
        '-moz-transform-origin'    : '0 0',
        '-ms-transform-origin'     : '0 0',
        '-o-transform-origin'      : '0 0',
        'transform-origin'         : '0 0' 
      });

      // Don't set a left value if the window width is greater than the
      // supported resolution.  Instead, let margin: auto center the viewport
      if (window.innerWidth > RESOLUTION.WIDTH) return;

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
