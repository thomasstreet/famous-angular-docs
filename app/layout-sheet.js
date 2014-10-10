angular.module('famous-angular')

.run(function($media) {

  $media.$sheet('layoutSheet', {

    xs: {
      '#nav-bar': {
        style: function() {
          return {
            'display': 'none'
          };
        }
      },
      '#viewport': {
        style: function() {
          var navHeight = 50;
          return {
            'top': navHeight + 'px',
            'height': function() {
              return window.innerHeight - navHeight + 'px';
            }
          };
        }
      },
    },

    sm: {
      '#nav-bar': {
        style: function() {
          return {
            'opacity': 'block'
          };
        }
      },
      '#viewport': {
        style: function() {
          var navHeight = 100;
          return {
            'top': navHeight + 'px',
            'height': function() {
              return window.innerHeight - navHeight + 'px';
            }
          };
        }
      },
    }
  });

})

;
