angular.module('faHeaderFooterExampleAppB', ['famous.angular'])
    .controller('HeaderFooterCtrlB', ['$scope', function($scope) {
      $scope.views = [
        {bgColor: "red", text: "header", size: [undefined, 100]},
        {bgColor: "green", text: "content", size: [undefined, undefined]},
        {bgColor: "blue", text: "footer", size: [undefined, 100]}
      ];
  }]);