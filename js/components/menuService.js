angular.module('menuApp.services', []).service('menuService', function($http) { 

	this.loadOutput = function(callbackFunc) {
    $http({
        method: 'GET',
        url: 'js/output.json'
     }).success(function(data){
        // With the data succesfully returned, call our callback
        console.log(JSON.stringify(data));
        callbackFunc(data);
    }).error(function(){
        alert("error");
    });
 }
});