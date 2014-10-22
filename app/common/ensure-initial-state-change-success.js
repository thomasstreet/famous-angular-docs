angular.module('famous-angular')

// Sometimes our initial pageload's $stateChangeSuccess happens before the
// controllers can set up their listeners, so always ensure that a
// $stateChangeSuccess happens after listeners have had time to set up.

.run(function($rootScope, $state, stateUtils) {

  if (window.location.hash !== '#/') {
    var stateName = window.location.hash.replace(/\#\//, '');
    setTimeout(function() {
      if ($state.current.name !== stateName) {
        $state.go(stateName, null, {reload: true});
      }
    }, 100);
  }

});
