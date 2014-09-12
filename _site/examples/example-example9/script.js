angular.module('faIndexExampleApp', ['famous.angular'])
    .controller('IndexCtrl', ['$scope', '$famous', function($scope, $famous) {

     var EventHandler = $famous['famous/core/EventHandler'];
     $scope.eventHandler = new EventHandler();
     $scope.list = [{content: "famous"}, {content: "angular"}, {content: "rocks!"}];
    
     $scope.options = {
       scrollView: {
         direction: 0 // displays the fa-views horizontally
       }
     };

  }]);