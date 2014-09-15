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
      
      // 3 scrollviews
      $scope.scrollViews = [{pipe: "pipes.A", bgColor: "blue"}, {pipe: "pipes.B", bgColor: "red"}, {pipe: "pipes.C", bgColor: "green"}];
      
      // pipes that each of the 3 scroll views is binded to through fa-pipe-from
      $scope.pipes = {
        A: $scope.emptyPipe,
        B: $scope.emptyPipe,
        C: $scope.emptyPipe
      };
      
      // function that is called whenever a checkbox is checked/unchecked that assigns the fa-pipe-from
      $scope.checkBoxChange = function(model, value) {
        if (value !== "false") {
          $scope.pipes[model] = $scope.mainPipe;
        } else {
          $scope.pipes[model] = $scope.emptyPipe;
        };
      };
  }]);