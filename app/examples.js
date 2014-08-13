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
