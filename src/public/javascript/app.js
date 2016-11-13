var app = angular.module('app',['ngRoute','ngMaterial','md.data.table','inventoryController','checkController','addNewController','userRecordController']);

app.config(function($routeProvider) {
  $routeProvider.when('/', {
    templateUrl: '../pages/inventory.html',
    controller: 'inventoryController'
  }).when('/check',{
    templateUrl: '../pages/check.html',
    controller: 'checkController'
  }).when('/add',{
    templateUrl: '../pages/new.html',
    controller: 'addNewController'
  }).when('/user',{
    templateUrl:'../pages/user.html',
    controller: 'userRecordController'
  })
});
