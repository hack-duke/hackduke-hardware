var userRecordController = angular.module('userRecordController',[]);
userRecordController.controller('userRecordController',['$scope','$http',function($scope,$http) {
  $scope.loaded = false;
  $scope.uid = '';
  $scope.record = [];

  $scope.query = {
    order:'id',
    limit: 3,
    page: 1
  }

  $scope.findByUserId = function() {
    if($scope.uid==='') return;
    $http({
      method:'GET',
      url:'/api/user/'+$scope.uid
    }).then(function success(res) {
      $scope.record = res.data;
      $scope.loaded = true;
      $scope.hasData = res.data.length>0;
    },function error() {
      alert('error loading record for user');
    });
  };

}]);
