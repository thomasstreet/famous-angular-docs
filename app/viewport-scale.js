angular.module('famous-angular')

.run(function($rootScope) {
    var NAVBAR = {
      HEIGHT: 100
    };

    // These dimensions will always be set on the fa-app via CSS, regardless 
    // of the user's window dimensions
    var FORCED_RESOLUTION = {
      WIDTH: 1920,
      HEIGHT: 1080 - NAVBAR.HEIGHT
    };

    setLeftOffset();
    $(window).bind('resize', setLeftOffset);

    // Set the left offset based upon the scale amount, to re-center the fa-app
    function setLeftOffset() {
      var scale = getViewportScale();

      var leftOffset = (window.innerWidth / 2) - (scale * FORCED_RESOLUTION.WIDTH / 2);
    
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
      if (window.innerWidth > FORCED_RESOLUTION.WIDTH) return;

      $('#fa-app').css('left', Math.floor(leftOffset));
    }

    function getViewportScale() {
      var xScale, yScale;

      var viewport = {
        height: window.innerHeight - NAVBAR.HEIGHT,
        width: window.innerWidth
      };

      if (viewport.height < FORCED_RESOLUTION.HEIGHT) {
        yScale = viewport.height / FORCED_RESOLUTION.HEIGHT;
        yScale = yScale.toFixed(2);
      } else {
        yScale = 1;
      }

      if (viewport.width < FORCED_RESOLUTION.WIDTH) {
        xScale = viewport.width / FORCED_RESOLUTION.WIDTH;
        xScale = xScale.toFixed(2);
      } else {
        xScale = 1;
      }

      var smallestScale = xScale < yScale ? xScale : yScale;

      return smallestScale;
    };
});
