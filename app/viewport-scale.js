angular.module('famous-angular')

.run(function($rootScope, $media) {

  var NAVBAR = {
    HEIGHT: 100
  };

  var _forcedResolution;

  determineResolution();
  setLeftOffset();

  $(window).bind('resize', function() {
    determineResolution();
    setLeftOffset();
  });

  function determineResolution() {
    // These dimensions will always be set on the fa-app via CSS, regardless 
    // of the user's actual window dimensions

    var size_xs = !$media.$query('sm');

    if (size_xs) {
      _forcedResolution = {
        width: 414,
        height: 736 - NAVBAR.HEIGHT
      };
    } else {
      _forcedResolution = {
        width: 1920,
        height: 1080 - NAVBAR.HEIGHT
      };
    }
  }

  // Set the left offset based upon the scale amount, to re-center the fa-app
  function setLeftOffset() {
    var scale = getViewportScale();

    var leftOffset = (window.innerWidth / 2) - (scale * _forcedResolution.width / 2);
  
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
    if (window.innerWidth > _forcedResolution.width) return;

    $('#fa-app').css('left', Math.floor(leftOffset));
  }

  function getViewportScale() {
    var xScale, yScale;

    var viewport = {
      height: window.innerHeight - NAVBAR.HEIGHT,
      width: window.innerWidth
    };

    if (viewport.height < _forcedResolution.height) {
      yScale = viewport.height / _forcedResolution.height;
      yScale = yScale.toFixed(2);
    } else {
      yScale = 1;
    }

    if (viewport.width < _forcedResolution.width) {
      xScale = viewport.width / _forcedResolution.width;
      xScale = xScale.toFixed(2);
    } else {
      xScale = 1;
    }

    var smallestScale = xScale < yScale ? xScale : yScale;

    return smallestScale;
  };

});
