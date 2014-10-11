// https://gist.github.com/RubaXa/5569075

/**
 * jQuery extension, add support `scrollstart` and `scrollend` events.
 *
 * @author  RubaXa  <trash@rubaxa.org>
 * @github  https://gist.github.com/RubaXa/5568964
 * @license MIT
 *
 *
 * @settings
 *    $.special.scrollend.delay = 300; // default ms
 *
 * @flags
 *    $.isScrolled; // boolean
 *
 * @binding
 *    $(window).bind('scrollstart scrollend', function (evt){
 *      if( evt.type == 'scrollstart' ){
 *        // logic
 *      }
 *    });
 *
 */
(function ($){
  var
      ns    = (new Date).getTime()
    , special = $.event.special
    , dispatch  = $.event.handle || $.event.dispatch
 
    , scroll    = 'scroll'
    , scrollStart = scroll + 'start'
    , scrollEnd   = scroll + 'end'
    , nsScrollStart = scroll +'.'+ scrollStart + ns
    , nsScrollEnd = scroll +'.'+ scrollEnd + ns
  ;
 
  special.scrollstart = {
    setup: function (){
      var pid, handler = function (evt/**$.Event*/){
        if( pid == null ){
          evt.type = scrollStart;
          dispatch.apply(this, arguments);
        }
        else {
          clearTimeout(pid);
        }
 
        pid = setTimeout(function(){
          pid = null;
        }, special.scrollend.delay);
 
      };
 
      $(this).bind(nsScrollStart, handler);
      $(this).bind('touchstart', handler);
    },
 
    teardown: function (){
      $(this).unbind(nsScrollStart);
    }
  };
 
  special.scrollend = {
    delay: 300,
 
    setup: function (){
      var pid, handler = function (evt/**$.Event*/){
        var _this = this, args = arguments;
 
        clearTimeout(pid);
        pid = setTimeout(function(){
          evt.type = scrollEnd;
          dispatch.apply(_this, args);
        }, special.scrollend.delay);
 
      };
 
      $(this).bind(nsScrollEnd, handler);
      $(this).bind('touchend', handler);
    },
 
    teardown: function (){
      $(this).unbind(nsScrollEnd);
    }
  };
 
 
  $.isScrolled = false;
  $(window).bind(scrollStart+' '+scrollEnd, function (evt/**Event*/){
    $.isScrolled = (evt.type == scrollStart);
    $('body')[$.isScrolled ? 'addClass' : 'removeClass']('is-scrolled');
  });
})(jQuery);
