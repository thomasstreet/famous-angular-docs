angular.module('famous-angular', [
  'famous.angular',
  'ui.router',
  'ts.sheets'
])

.config(function($rootScopeProvider, $mediaProvider, $famousProvider) {
  var $famous = $famousProvider.$get();
  var $rootscope = $rootScopeProvider.$get();

  var FAMOUS_FIELD_HANDLERS = [
      {
        field: 'transform',
        handlerFn: function(element, payloadFn){
          var isolate = $famous.getIsolate(angular.element(element).scope());
          isolate.modifier.transformFrom(payloadFn);
        }
      },
      {
        field: 'size',
        handlerFn: function(element, payloadFn){
          var isolate = $famous.getIsolate(angular.element(element).scope());
          isolate.modifier.sizeFrom(payloadFn);
        }
      },
      {
        field: 'origin',
        handlerFn: function(element, payloadFn){
          var isolate = $famous.getIsolate(angular.element(element).scope());
          isolate.modifier.originFrom(payloadFn);
        }
      },
      {
        field: 'align',
        handlerFn: function(element, payloadFn){
          var isolate = $famous.getIsolate(angular.element(element).scope());
          isolate.modifier.alignFrom(payloadFn);
        }
      },
      {
        field: 'opacity',
        handlerFn: function(element, payloadFn){
          var isolate = $famous.getIsolate(angular.element(element).scope());
          isolate.modifier.opacityFrom(payloadFn);
        }
      },
      {
        field: 'options',
        handlerFn: function(element, payloadFn){
          //TODO:  support
          throw new Error('unimplemented: cannot yet set options through Sheets')
          //we need to angular $watch this one, since
          //options doesn't support functional assignment
          //Need to make sure to clean up watchers when this gets re-called
        }
      },
      {
        field: 'style',
        handlerFn: function(element, payloadFn) {
          var cssData = payloadFn();
          for (var propertyName in cssData) {
            var propertyValue = cssData[propertyName];
            element.style.[propertyName] = propertyValue;
          }
        }
        console.log(element.style);
      }
    ];

    angular.forEach(FAMOUS_FIELD_HANDLERS, function(fieldHandler) {
      $mediaProvider.$registerFieldHandler(fieldHandler.field, fieldHandler.handlerFn);
    });
})

;
