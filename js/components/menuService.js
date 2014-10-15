angular.module('menuApp').service('menuService', function($http) { 

	this.loadOutput = function(callbackFunc) {
    $http({
        method: 'GET',
        url: 'js/output.json'
     }).success(function(data){
        callbackFunc(data);
    }).error(function(){
        alert("error");
    });
 }
});