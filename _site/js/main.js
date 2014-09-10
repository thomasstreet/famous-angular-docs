function translateSquare(index) {

  return (index || 0) * 75;
}

angular.module('famous-angular', ['famous.angular'])

  .controller('homepageExamplesCtrl', function($scope) {

    $scope.options = {
      grid: {
        dimensions: [2, 2]
      }
    };

    $scope.squares = _.map(_.range(0, 4), function(index) {
      return { x: translateSquare(index) };
    });

    $scope.repeatedItems = 1;
    $scope.modifiers     = [0, 1, 2];

    $scope.data = {
      rangeValue: 0
    };

    $scope.translateX = function(rangeValue) {
      var sliderWidth = 300;
      var leftOffset = -20;
      if (!rangeValue) {
        return 0 + leftOffset;
      }
      return ((Number(rangeValue) / 100) * sliderWidth) + leftOffset;
    };

    $scope.$watch('repeatedItems', function(value) {
      $scope.modifiers = _.range(0, value);
    });

  })
  .directive('square', function($famous) {
    var Transform = $famous['famous/core/Transform'];
    var Transitionable = $famous['famous/transitions/Transitionable'];
    var SnapTransition = $famous['famous/transitions/SnapTransition'];

    var flipOut = Transform.rotateZ(Math.PI / 2);
    var flipIn  = Transform.inverse(flipOut);

    return {
      restrict: 'A',
      priority: 3,
      link: function(scope, element, attrs) {
        var transform = new Transitionable(Transform.multiply(
          Transform.translate(translateSquare(scope.$index % 4), Math.floor(scope.$index / 4) * 60 + 40, 0),
          flipOut
        ));
        console.log(transform.get());

        var opacity = new Transitionable(0);

        function enter() {
          transform.set(Transform.multiply(transform.get(), flipIn), {
            duration: 250,
            transition: SnapTransition
          });

          opacity.set(1, {duration: 250, curve: 'easeOut'});

          return 250;
        };

        function leave() {
          transform.set(Transform.multiply(transform.get(), flipOut), {
            duration: 250,
            transition: SnapTransition
          });

          opacity.set(0, {duration: 250, curve: 'easeIn'});

          return 250;
        };

        function halt() {
          scope.transform.halt();
        };

        angular.extend(scope, {
          enter: enter,
          leave: leave,
          halt: halt,
          opacity: opacity,
          transform: transform
        });
      }
    }
  });

'use strict';

var directive = {};
var service = { value: {} };

var DEPENDENCIES = {
  'angular.js': 'http://code.angularjs.org/' + angular.version.full + '/angular.min.js',
  'angular-resource.js': 'http://code.angularjs.org/' + angular.version.full + '/angular-resource.min.js',
  'angular-route.js': 'http://code.angularjs.org/' + angular.version.full + '/angular-route.min.js',
  'angular-animate.js': 'http://code.angularjs.org/' + angular.version.full + '/angular-animate.min.js',
  'angular-sanitize.js': 'http://code.angularjs.org/' + angular.version.full + '/angular-sanitize.min.js',
  'angular-cookies.js': 'http://code.angularjs.org/' + angular.version.full + '/angular-cookies.min.js'
};


function escape(text) {
  return text.
    replace(/\&/g, '&amp;').
    replace(/\</g, '&lt;').
    replace(/\>/g, '&gt;').
    replace(/"/g, '&quot;');
}

/**
 * http://stackoverflow.com/questions/451486/pre-tag-loses-line-breaks-when-setting-innerhtml-in-ie
 * http://stackoverflow.com/questions/195363/inserting-a-newline-into-a-pre-tag-ie-javascript
 */
function setHtmlIe8SafeWay(element, html) {
  var newElement = angular.element('<pre>' + html + '</pre>');

  element.empty();
  element.append(newElement.contents());
  return element;
}


directive.jsFiddle = function(getEmbeddedTemplate, escape, script) {
  return {
    terminal: true,
    link: function(scope, element, attr) {
      var name = '',
        stylesheet = '<link rel="stylesheet" href="http://twitter.github.com/bootstrap/assets/css/bootstrap.css">\n',
        fields = {
          html: '',
          css: '',
          js: ''
        };

      angular.forEach(attr.jsFiddle.split(' '), function(file, index) {
        var fileType = file.split('.')[1];

        if (fileType == 'html') {
          if (index == 0) {
            fields[fileType] +=
              '<div ng-app' + (attr.module ? '="' + attr.module + '"' : '') + '>\n' +
                getEmbeddedTemplate(file, 2);
          } else {
            fields[fileType] += '\n\n\n  <!-- CACHE FILE: ' + file + ' -->\n' +
              '  <script type="text/ng-template" id="' + file + '">\n' +
              getEmbeddedTemplate(file, 4) +
              '  </script>\n';
          }
        } else {
          fields[fileType] += getEmbeddedTemplate(file) + '\n';
        }
      });

      fields.html += '</div>\n';

      setHtmlIe8SafeWay(element,
        '<form class="jsfiddle" method="post" action="http://jsfiddle.net/api/post/library/pure/" target="_blank">' +
          hiddenField('title', 'AngularJS Example: ' + name) +
          hiddenField('css', '</style> <!-- Ugly Hack due to jsFiddle issue: http://goo.gl/BUfGZ --> \n' +
            stylesheet +
            script.angular +
            (attr.resource ? script.resource : '') +
            '<style>\n' +
            fields.css) +
          hiddenField('html', fields.html) +
          hiddenField('js', fields.js) +
          '<button class="btn btn-primary"><i class="icon-white icon-pencil"></i> Edit Me</button>' +
          '</form>');

      function hiddenField(name, value) {
        return '<input type="hidden" name="' +  name + '" value="' + escape(value) + '">';
      }
    }
  }
};



directive.ngSetText = ['getEmbeddedTemplate', function(getEmbeddedTemplate) {
  return {
    restrict: 'CA',
    priority: 10,
    compile: function(element, attr) {
      setHtmlIe8SafeWay(element, escape(getEmbeddedTemplate(attr.ngSetText)));
    }
  }
}]


directive.ngHtmlWrap = ['reindentCode', 'templateMerge', function(reindentCode, templateMerge) {
  return {
    compile: function(element, attr) {
      var properties = {
            head: '',
            module: '',
            body: element.text()
          },
        html = "<!doctype html>\n<html ng-app{{module}}>\n  <head>\n{{head:4}}  </head>\n  <body>\n{{body:4}}  </body>\n</html>";

      angular.forEach((attr.ngHtmlWrap || '').split(' '), function(dep) {
        if (!dep) return;
        dep = DEPENDENCIES[dep] || dep;

        var ext = dep.split(/\./).pop();

        if (ext == 'css') {
          properties.head += '<link rel="stylesheet" href="' + dep + '" type="text/css">\n';
        } else if(ext == 'js') {
          properties.head += '<script src="' + dep + '"></script>\n';
        } else {
          properties.module = '="' + dep + '"';
        }
      });

      setHtmlIe8SafeWay(element, escape(templateMerge(html, properties)));
    }
  }
}];


directive.ngSetHtml = ['getEmbeddedTemplate', function(getEmbeddedTemplate) {
  return {
    restrict: 'CA',
    priority: 10,
    compile: function(element, attr) {
      setHtmlIe8SafeWay(element, getEmbeddedTemplate(attr.ngSetHtml));
    }
  }
}];


directive.ngEvalJavascript = ['getEmbeddedTemplate', function(getEmbeddedTemplate) {
  return {
    compile: function (element, attr) {
      var fileNames = attr.ngEvalJavascript.split(' ');
      angular.forEach(fileNames, function(fileName) {
        var script = getEmbeddedTemplate(fileName);
        try {
          if (window.execScript) { // IE
            window.execScript(script || '""'); // IE complains when evaling empty string
          } else {
            window.eval(script + '//@ sourceURL=' + fileName);
          }
        } catch (e) {
          if (window.console) {
            window.console.log(script, '\n', e);
          } else {
            window.alert(e);
          }
        }
      });
    }
  };
}];


directive.ngEmbedApp = ['$templateCache', '$browser', '$rootScope', '$location', '$sniffer', '$animate',
                function($templateCache,   $browser,  docsRootScope, $location,   $sniffer,   $animate) {
  return {
    terminal: true,
    link: function(scope, element, attrs) {
      var modules = ['ngAnimate'],
          embedRootScope,
          deregisterEmbedRootScope;

      modules.push(['$provide', function($provide) {
        $provide.value('$templateCache', $templateCache);
        $provide.value('$anchorScroll', angular.noop);
        $provide.value('$browser', $browser);
        $provide.value('$sniffer', $sniffer);
        $provide.value('$animate', $animate);
        $provide.provider('$location', function() {
          this.$get = ['$rootScope', function($rootScope) {
            docsRootScope.$on('$locationChangeSuccess', function(event, oldUrl, newUrl) {
              $rootScope.$broadcast('$locationChangeSuccess', oldUrl, newUrl);
            });
            return $location;
          }];
          this.html5Mode = angular.noop;
        });

        $provide.decorator('$rootScope', ['$delegate', function($delegate) {
          embedRootScope = $delegate;

          // Since we are teleporting the $animate service, which relies on the $$postDigestQueue
          // we need the embedded scope to use the same $$postDigestQueue as the outer scope
          embedRootScope.$$postDigestQueue = docsRootScope.$$postDigestQueue;

          deregisterEmbedRootScope = docsRootScope.$watch(function embedRootScopeDigestWatch() {
            embedRootScope.$digest();
          });

          return embedRootScope;
        }]);
      }]);
      if (attrs.ngEmbedApp)  modules.push(attrs.ngEmbedApp);

      element.on('click', function(event) {
        if (event.target.attributes.getNamedItem('ng-click')) {
          event.preventDefault();
        }
      });

      element.on('$destroy', function() {
        deregisterEmbedRootScope();
        embedRootScope.$destroy();
      });

      element.data('$injector', null);
      angular.bootstrap(element, modules);
    }
  };
}];

service.reindentCode = function() {
  return function (text, spaces) {
    if (!text) return text;
    var lines = text.split(/\r?\n/);
    var prefix = '      '.substr(0, spaces || 0);
    var i;

    // remove any leading blank lines
    while (lines.length && lines[0].match(/^\s*$/)) lines.shift();
    // remove any trailing blank lines
    while (lines.length && lines[lines.length - 1].match(/^\s*$/)) lines.pop();
    var minIndent = 999;
    for (i = 0; i < lines.length; i++) {
      var line = lines[0];
      var reindentCode = line.match(/^\s*/)[0];
      if (reindentCode !== line && reindentCode.length < minIndent) {
        minIndent = reindentCode.length;
      }
    }

    for (i = 0; i < lines.length; i++) {
      lines[i] = prefix + lines[i].substring(minIndent);
    }
    lines.push('');
    return lines.join('\n');
  }
};

service.templateMerge = ['reindentCode', function(indentCode) {
  return function(template, properties) {
    return template.replace(/\{\{(\w+)(?:\:(\d+))?\}\}/g, function(_, key, indent) {
      var value = properties[key];

      if (indent) {
        value = indentCode(value, indent);
      }

      return value == undefined ? '' : value;
    });
  };
}];

service.getEmbeddedTemplate = ['reindentCode', function(reindentCode) {
  return function (id) {
    var element = document.getElementById(id);

    if (!element) {
      return null;
    }

    return reindentCode(angular.element(element).html(), 0);
  }
}];


angular.module('bootstrapPrettify', []).directive(directive).factory(service);

'use strict';

var directive = {};

directive.runnableExample = ['$templateCache', function($templateCache) {
  var exampleClassNameSelector = '.runnable-example-file';
  var tpl =
    '<nav class="runnable-example-tabs" ng-if="tabs">' +
    '  <a ng-class="{active:$index==activeTabIndex}"' +
         'ng-repeat="tab in tabs track by $index" ' +
         'href="" ' +
         'class="btn"' +
         'ng-click="setTab($index)">' +
    '    {{ tab }}' +
    '  </a>' +
    '</nav>';

  return {
    restrict: 'C',
    scope : true,
    controller : ['$scope', function($scope) {
      $scope.setTab = function(index) {
        var tab = $scope.tabs[index];
        $scope.activeTabIndex = index;
        $scope.$broadcast('tabChange', index, tab);
      };
    }],
    compile : function(element) {
      element.html(tpl + element.html());
      return function(scope, element) {
        var node = element[0];
        var examples = node.querySelectorAll(exampleClassNameSelector);
        var tabs = [], now = Date.now();
        angular.forEach(examples, function(child, index) {
          tabs.push(child.getAttribute('name'));
        });

        if(tabs.length > 0) {
          scope.tabs = tabs;
          scope.$on('tabChange', function(e, index, title) {
            angular.forEach(examples, function(child) {
              child.style.display = 'none';
            });
            var selected = examples[index];
            selected.style.display = 'block';
          });
          scope.setTab(0);
        }
      }
    }
  };
}];

directive.dropdownToggle =
          ['$document', '$location', '$window',
  function ($document,   $location,   $window) {
    var openElement = null, close;
    return {
      restrict: 'C',
      link: function(scope, element, attrs) {
        scope.$watch(function dropdownTogglePathWatch(){return $location.path();}, function dropdownTogglePathWatchAction() {
          close && close();
        });

        element.parent().on('click', function(event) {
          close && close();
        });

        element.on('click', function(event) {
          event.preventDefault();
          event.stopPropagation();

          var iWasOpen = false;

          if (openElement) {
            iWasOpen = openElement === element;
            close();
          }

          if (!iWasOpen){
            element.parent().addClass('open');
            openElement = element;

            close = function (event) {
              event && event.preventDefault();
              event && event.stopPropagation();
              $document.off('click', close);
              element.parent().removeClass('open');
              close = null;
              openElement = null;
            }

            $document.on('click', close);
          }
        });
      }
    };
  }];

directive.syntax = function() {
  return {
    restrict: 'A',
    link: function(scope, element, attrs) {
      function makeLink(type, text, link, icon) {
        return '<a href="' + link + '" class="btn syntax-' + type + '" target="_blank" rel="nofollow">' +
                '<span class="' + icon + '"></span> ' + text +
               '</a>';
      };

      var html = '';
      var types = {
        'github' : {
          text : 'View on Github',
          key : 'syntaxGithub',
          icon : 'icon-github'
        },
        'plunkr' : {
          text : 'View on Plunkr',
          key : 'syntaxPlunkr',
          icon : 'icon-arrow-down'
        },
        'jsfiddle' : {
          text : 'View on JSFiddle',
          key : 'syntaxFiddle',
          icon : 'icon-cloud'
        }
      };
      for(var type in types) {
        var data = types[type];
        var link = attrs[data.key];
        if(link) {
          html += makeLink(type, data.text, link, data.icon);
        }
      };

      var nav = document.createElement('nav');
      nav.className = 'syntax-links';
      nav.innerHTML = html;

      var node = element[0];
      var par = node.parentNode;
      par.insertBefore(nav, node);
    }
  }
}

directive.tabbable = function() {
  return {
    restrict: 'C',
    compile: function(element) {
      var navTabs = angular.element('<ul class="nav nav-tabs"></ul>'),
          tabContent = angular.element('<div class="tab-content"></div>');

      tabContent.append(element.contents());
      element.append(navTabs).append(tabContent);
    },
    controller: ['$scope', '$element', function($scope, $element) {
      var navTabs = $element.contents().eq(0),
          ngModel = $element.controller('ngModel') || {},
          tabs = [],
          selectedTab;

      ngModel.$render = function() {
        var $viewValue = this.$viewValue;

        if (selectedTab ? (selectedTab.value != $viewValue) : $viewValue) {
          if(selectedTab) {
            selectedTab.paneElement.removeClass('active');
            selectedTab.tabElement.removeClass('active');
            selectedTab = null;
          }
          if($viewValue) {
            for(var i = 0, ii = tabs.length; i < ii; i++) {
              if ($viewValue == tabs[i].value) {
                selectedTab = tabs[i];
                break;
              }
            }
            if (selectedTab) {
              selectedTab.paneElement.addClass('active');
              selectedTab.tabElement.addClass('active');
            }
          }

        }
      };

      this.addPane = function(element, attr) {
        var li = angular.element('<li><a href></a></li>'),
            a = li.find('a'),
            tab = {
              paneElement: element,
              paneAttrs: attr,
              tabElement: li
            };

        tabs.push(tab);

        attr.$observe('value', update)();
        attr.$observe('title', function(){ update(); a.text(tab.title); })();

        function update() {
          tab.title = attr.title;
          tab.value = attr.value || attr.title;
          if (!ngModel.$setViewValue && (!ngModel.$viewValue || tab == selectedTab)) {
            // we are not part of angular
            ngModel.$viewValue = tab.value;
          }
          ngModel.$render();
        }

        navTabs.append(li);
        li.on('click', function(event) {
          event.preventDefault();
          event.stopPropagation();
          if (ngModel.$setViewValue) {
            $scope.$apply(function() {
              ngModel.$setViewValue(tab.value);
              ngModel.$render();
            });
          } else {
            // we are not part of angular
            ngModel.$viewValue = tab.value;
            ngModel.$render();
          }
        });

        return function() {
          tab.tabElement.remove();
          for(var i = 0, ii = tabs.length; i < ii; i++ ) {
            if (tab == tabs[i]) {
              tabs.splice(i, 1);
            }
          }
        };
      }
    }]
  };
};

directive.table = function() {
  return {
    restrict: 'E',
    link: function(scope, element, attrs) {
      if (!attrs['class']) {
        element.addClass('table table-bordered table-striped code-table');
      }
    }
  };
};

var popoverElement = function() {
  var object = {
    init : function() {
      this.element = angular.element(
        '<div class="popover popover-incode top">' +
          '<div class="arrow"></div>' +
          '<div class="popover-inner">' +
            '<div class="popover-title"><code></code></div>' +
            '<div class="popover-content"></div>' +
          '</div>' +
        '</div>'
      );
      this.node = this.element[0];
      this.element.css({
        'display':'block',
        'position':'absolute'
      });
      angular.element(document.body).append(this.element);

      var inner = this.element.children()[1];
      this.titleElement   = angular.element(inner.childNodes[0].firstChild);
      this.contentElement = angular.element(inner.childNodes[1]);

      //stop the click on the tooltip
      this.element.on('click', function(event) {
        event.preventDefault();
        event.stopPropagation();
      });

      var self = this;
      angular.element(document.body).on('click',function(event) {
        if(self.visible()) self.hide();
      });
    },

    show : function(x,y) {
      this.element.addClass('visible');
      this.position(x || 0, y || 0);
    },

    hide : function() {
      this.element.removeClass('visible');
      this.position(-9999,-9999);
    },

    visible : function() {
      return this.position().y >= 0;
    },

    isSituatedAt : function(element) {
      return this.besideElement ? element[0] == this.besideElement[0] : false;
    },

    title : function(value) {
      return this.titleElement.html(value);
    },

    content : function(value) {
      if(value && value.length > 0) {
        value = marked(value);
      }
      return this.contentElement.html(value);
    },

    positionArrow : function(position) {
      this.node.className = 'popover ' + position;
    },

    positionAway : function() {
      this.besideElement = null;
      this.hide();
    },

    positionBeside : function(element) {
      this.besideElement = element;

      var elm = element[0];
      var x = elm.offsetLeft;
      var y = elm.offsetTop;
      x -= 30;
      y -= this.node.offsetHeight + 10;
      this.show(x,y);
    },

    position : function(x,y) {
      if(x != null && y != null) {
        this.element.css('left',x + 'px');
        this.element.css('top', y + 'px');
      }
      else {
        return {
          x : this.node.offsetLeft,
          y : this.node.offsetTop
        };
      }
    }
  };

  object.init();
  object.hide();

  return object;
};

directive.popover = ['popoverElement', function(popover) {
  return {
    restrict: 'A',
    priority : 500,
    link: function(scope, element, attrs) {
      element.on('click',function(event) {
        event.preventDefault();
        event.stopPropagation();
        if(popover.isSituatedAt(element) && popover.visible()) {
          popover.title('');
          popover.content('');
          popover.positionAway();
        }
        else {
          popover.title(attrs.title);
          popover.content(attrs.content);
          popover.positionBeside(element);
        }
      });
    }
  }
}];

directive.tabPane = function() {
  return {
    require: '^tabbable',
    restrict: 'C',
    link: function(scope, element, attrs, tabsCtrl) {
      element.on('$remove', tabsCtrl.addPane(element, attrs));
    }
  };
};

directive.foldout = ['$http', '$animate','$window', function($http, $animate, $window) {
  return {
    restrict: 'A',
    priority : 500,
    link: function(scope, element, attrs) {
      var container, loading, url = attrs.url;
      if(/\/build\//.test($window.location.href)) {
        url = '/build/docs' + url;
      }
      element.on('click',function() {
        scope.$apply(function() {
          if(!container) {
            if(loading) return;

            loading = true;
            var par = element.parent();
            container = angular.element('<div class="foldout">loading...</div>');
            $animate.enter(container, null, par);

            $http.get(url, { cache : true }).success(function(html) {
              loading = false;

              html = '<div class="foldout-inner">' +
                      '<div calss="foldout-arrow"></div>' +
                      html +
                     '</div>';
              container.html(html);

              //avoid showing the element if the user has already closed it
              if(container.css('display') == 'block') {
                container.css('display','none');
                $animate.addClass(container, 'ng-hide');
              }
            });
          }
          else {
            container.hasClass('ng-hide') ? $animate.removeClass(container, 'ng-hide') : $animate.addClass(container, 'ng-hide');
          }
        });
      });
    }
  }
}];

angular.module('bootstrap', [])
  .directive(directive)
  .factory('popoverElement', popoverElement);
//  .run(function() {
//    marked.setOptions({
//      gfm: true,
//      tables: true
//    });
//  });

angular.module('docsApp', ['examples', 'bootstrap', 'bootstrapPrettify'])

  .controller('DocsController', [
    '$scope', 'openPlunkr',
    function($scope, openPlunkr) {
      $scope.openPlunkr = openPlunkr;
    }]);

/* This code is taken from the AngularUI - Bootstrap Project (https://github.com/angular-ui/bootstrap)
 *
 * The MIT License
 * 
 * Copyright (c) 2012-2014 the AngularUI Team, https://github.com/organizations/angular-ui/teams/291112
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 *
 */

angular.module('ui.bootstrap.dropdown', [])

.constant('dropdownConfig', {
  openClass: 'open'
})

.service('dropdownService', ['$document', function($document) {
  var self = this, openScope = null;

  this.open = function( dropdownScope ) {
    if ( !openScope ) {
      $document.on('click', closeDropdown);
      $document.on('keydown', escapeKeyBind);
    }

    if ( openScope && openScope !== dropdownScope ) {
        openScope.isOpen = false;
    }

    openScope = dropdownScope;
  };

  this.close = function( dropdownScope ) {
    if ( openScope === dropdownScope ) {
      openScope = null;
      $document.off('click', closeDropdown);
      $document.off('keydown', escapeKeyBind);
    }
  };

  var closeDropdown = function() {
    openScope.$apply(function() {
      openScope.isOpen = false;
    });
  };

  var escapeKeyBind = function( evt ) {
    if ( evt.which === 27 ) {
      closeDropdown();
    }
  };
}])

.controller('DropdownController', ['$scope', '$attrs', 'dropdownConfig', 'dropdownService', '$animate', function($scope, $attrs, dropdownConfig, dropdownService, $animate) {
  var self = this, openClass = dropdownConfig.openClass;

  this.init = function( element ) {
    self.$element = element;
    $scope.isOpen = angular.isDefined($attrs.isOpen) ? $scope.$parent.$eval($attrs.isOpen) : false;
  };

  this.toggle = function( open ) {
    return $scope.isOpen = arguments.length ? !!open : !$scope.isOpen;
  };

  // Allow other directives to watch status
  this.isOpen = function() {
    return $scope.isOpen;
  };

  $scope.$watch('isOpen', function( value ) {
    $animate[value ? 'addClass' : 'removeClass'](self.$element, openClass);

    if ( value ) {
      dropdownService.open( $scope );
    } else {
      dropdownService.close( $scope );
    }

    $scope.onToggle({ open: !!value });
  });

  $scope.$on('$locationChangeSuccess', function() {
    $scope.isOpen = false;
  });
}])

.directive('dropdown', function() {
  return {
    restrict: 'CA',
    controller: 'DropdownController',
    scope: {
      isOpen: '=?',
      onToggle: '&'
    },
    link: function(scope, element, attrs, dropdownCtrl) {
      dropdownCtrl.init( element );
    }
  };
})

.directive('dropdownToggle', function() {
  return {
    restrict: 'CA',
    require: '?^dropdown',
    link: function(scope, element, attrs, dropdownCtrl) {
      if ( !dropdownCtrl ) {
        return;
      }

      element.on('click', function(event) {
        event.preventDefault();
        event.stopPropagation();

        if ( !element.hasClass('disabled') && !element.prop('disabled') ) {
          scope.$apply(function() {
            dropdownCtrl.toggle();
          });
        }
      });

      // WAI-ARIA
      element.attr({ 'aria-haspopup': true, 'aria-expanded': false });
      scope.$watch(dropdownCtrl.isOpen, function( isOpen ) {
        element.attr('aria-expanded', !!isOpen);
      });
    }
  };
});
angular.module('examples', [])

  .factory('formPostData', ['$document', function($document) {
    return function(url, fields) {
      /**
       * Form previously posted to target="_blank", but pop-up blockers were causing this to not work.
       * If a user chose to bypass pop-up blocker one time and click the link, they would arrive at
       * a new default plnkr, not a plnkr with the desired template.
       */
      var form = angular.element('<form style="display: none;" method="post" action="' + url + '"></form>');
      angular.forEach(fields, function(value, name) {
        var input = angular.element('<input type="hidden" name="' + name + '">');
        input.attr('value', value);
        form.append(input);
      });
      $document.find('body').append(form);
      form[0].submit();
      form.remove();
    };
  }])

  .factory('openPlunkr', ['formPostData', '$http', '$q', function(formPostData, $http, $q) {
    return function(exampleFolder) {

      var exampleName = 'AngularJS Example';

      // Load the manifest for the example
      $http.get(exampleFolder + '/manifest.json')
        .then(function(response) {
          return response.data;
        })
        .then(function(manifest) {
          var filePromises = [];

          // Build a pretty title for the Plunkr
          var exampleNameParts = manifest.name.split('-');
          exampleNameParts.unshift('AngularJS');
          angular.forEach(exampleNameParts, function(part, index) {
            exampleNameParts[index] = part.charAt(0).toUpperCase() + part.substr(1);
          });
          exampleName = exampleNameParts.join(' - ');

          var getFileName = function(filename, checkName) {
            if(filename.indexOf('/') !== -1) {
              filename = filename.substr(filename.lastIndexOf('/') + 1, filename.length);
            }

            if(checkName && manifest.files.indexOf(filename) !== -1) {
              filename = '_' + filename;
            }
            return filename;
          }

          var pushLocalFile = function(filename, checkName) {
            var deferred = $q.defer();
            $http.get(exampleFolder + '/' + filename, { transformResponse: [] })
              .then(function(response) {
                var innerFiles = [];
                filename = getFileName(filename, checkName);

                var reg = /<(?:script|link).*(?:src|href)="((?!(http|\/\/))(?:(?!").)+)"/gi;
                var localResources = reg.exec(response.data);
                while(localResources && localResources[1]) {
                  if(manifest.files.indexOf(localResources[1]) === -1) {
                    innerFiles.push(pushLocalFile(localResources[1]), true);
                    response.data = response.data.replace(localResources[1], getFileName(localResources[1], true));
                  }
                  localResources = reg.exec(response.data);
                }

                if(innerFiles.length > 0) {
                  $q.all(innerFiles).then(function(files) {
                    files = files || [];
                    files.push({
                      name: filename,
                      content: response.data
                    });
                    deferred.resolve(files);
                  });
                } else {
                  deferred.resolve({
                    name: filename,
                    content: response.data
                  });
                }
              }, function error() {
                deferred.reject();
              });
            return deferred.promise;
          }

          angular.forEach(manifest.files, function(filename) {
            filePromises.push(pushLocalFile(filename));
          });
          return $q.all(filePromises);
        })
        .then(function(files) {
          var postData = {};

          angular.forEach(files, function(filesList) {
            if(angular.isArray(filesList)) {
              angular.forEach(filesList, function(file) {
                postData['files[' + file.name + ']'] = file.content;
              });
            } else {
              postData['files[' + filesList.name + ']'] = filesList.content;
            }
          });

          postData['tags[0]'] = "angularjs";
          postData['tags[1]'] = "example";
          postData.private = true;
          postData.description = exampleName;

          formPostData('http://plnkr.co/edit/?p=preview', postData);
        });
    };
  }]);
