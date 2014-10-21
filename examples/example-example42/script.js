angular.module('faPipeExampleApp', ['famous.angular'])
    .controller('PipeCtrl', ['$scope', '$famous', function($scope, $famous) {

      // Event Handlers
      var EventHandler = $famous['famous/core/EventHandler'];
      
      $scope.mainPipe = new EventHandler();
      $scope.emptyPipe = new EventHandler();
      
      // items in ng-repeated list in each of the 3 Scroll Views
      $scope.list = [];
      for (var i = 0; i < 10; i++) {
        $scope.list.push({});
      };
      
      // 3 inputs in the directional pad corresponding to the 3 scroll views
      $scope.inputList = [{model: "checkBox.A", letter: "A"},{model: "checkBox.B", letter: "B"}, {model: "checkBox.C", letter: "C"}];
      
      // pipes that each of the 3 scroll views is binded to through fa-pipe-from
      $scope.pipes = {
        A: $scope.emptyPipe,
        B: $scope.emptyPipe,
        C: $scope.emptyPipe
      };

      // 3 scrollviews
      $scope.scrollViews = [{pipe: $scope.pipes.A, bgColor: "blue"}, {pipe: $scope.pipes.B, bgColor: "red"}, {pipe: $scope.pipes.C, bgColor: "green"}];
      
      // function that is called whenever a checkbox is checked/unchecked that assigns the fa-pipe-from
      $scope.checkBoxChange = function(index, model, value) {
        if (value == 'true') {
          console.log($scope.pipes[model], + " is now pointing to mainPipe");
          $scope.scrollViews[index].pipe = $scope.mainPipe;
        
        } else {
          console.log($scope.pipes[model] + " is now pointing to emptyPipe");
          $scope.scrollViews[index].pipe = $scope.emptyPipe;
        }
      };
  }]);