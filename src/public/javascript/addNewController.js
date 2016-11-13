var addNewController = angular.module('addNewController',[]);
addNewController.controller('addNewController',['$scope','$mdToast','$http',function($scope,$mdToast,$http) {
  $scope.hardware = null;
  $scope.submitted = false;
  var last = {
      bottom: false,
      top: true,
      left: false,
      right: true
    };

  $scope.toastPosition = angular.extend({},last);

  $scope.getToastPosition = function() {

    return Object.keys($scope.toastPosition)
      .filter(function(pos) { return $scope.toastPosition[pos]; })
      .join(' ');
  };

  $scope.showSimpleToast = function() {
    var pinTo = $scope.getToastPosition();
    var el = angular.element(document.getElementById("toast-container"));
    $mdToast.show(
      $mdToast.simple()
        .textContent('Hardware added!')
        .parent(el)
        .position(pinTo )
        .hideDelay(1000)
    );
  };

  $scope.addAnother = function() {
    document.getElementById("form").reset();
    $scope.submitted = false;
  }

  $scope.addNew = function() {
    $scope.hardware.checked_out = false;
    $scope.hardware.user_checkout = "";
    $scope.hardware.checkout_time = "";
    $scope.hardware.record = [];
    $http({
      method:'PUT',
      url:'/api/hardware',
      data: $scope.hardware
      }).then(function success(res) {
        $scope.showSimpleToast();
        $scope.submitted = true;
      },function error(err) {
        alert('error adding data!');
        console.log(err);
      });
  };
}]);
