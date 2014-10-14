'use strict';
angular.module('menuApp', ['menuApp.services', 'menuApp.controllers', 'menuApp.directives' ,'ngSanitize']);

angular.module('menuApp.controllers', []).controller('menuController', function($scope,menuService) {

  $scope.focusIndex = 0;



    menuService.loadOutput(function(dataResponse) {
        $scope.data = dataResponse;
        //console.log("inside service",JSON.stringify(datai));
    });

  $scope.open = function (i,j){
    console.log("called item: "+$scope.data[j].spaces[i].name);
  } 

  $scope.displayFirst = function() {$scope.focusIndex = 0;}
  

   
  //$scope.onKeydown = function(item, $event, outerIndex){ console.log(item,outerIndex)};
  /* refactor this one*/
  $scope.keys = [];
  $scope.keys.push({ code: 13, action: function() { $scope.open($scope.focusIndex,$scope.parInd); }});
  $scope.keys.push({ code: 38, action: function() { $scope.focusIndex--; }});
  $scope.keys.push({ code: 40, action: function() { $scope.focusIndex++; }});
  
  $scope.$on('keydown', function( msg, obj ) {
    var code = obj.code;
    $scope.keys.forEach(function(o) {
      if ( o.code !== code ) { return; }
      o.action();
      $scope.$apply();
    });
  });
    
  
  $scope.filteredArrays = [];

  //$scope.data = d;

  var par = 0;
 
  
  $scope.currentParent = function (j,k){
    
    var parMax =  $scope.filteredArrays.length-1;
    console.log( $scope.focusIndex,par, $scope.filteredArrays[par].length,parMax);
    // f p l m 
    // 0 0 2 1
    // 1 0 2 1
    //console.log("filtered array",$scope.filteredArrays[par].length);
    //var j = $scope.filteredArrays[par].length -1;

    if(j < 0 && par > 0){
      $scope.focusIndex = $scope.filteredArrays[par-1].length-1;
      console.log($scope.filteredArrays[par-1].length);console.log("enter 1");
      par -=1;
      return par;
    } else
    if(j < 0 && par === 0){
      $scope.focusIndex = $scope.filteredArrays[parMax].length-1;
      par = parMax;console.log("enter 2");
      return par;
    } else 
    if(par==parMax && j > $scope.filteredArrays[parMax].length-1){
      par = 0;console.log("enter 3");
      $scope.focusIndex = 0;
      return par;
    }else
    if(j==$scope.filteredArrays[par].length){
      console.log("enter 4");
      $scope.focusIndex = 0;
      par +=1;
      return par;
    } 
    $scope.parInd = par;
    return par;
  }
});


angular.module('menuApp.directives', []).directive('myInput', function () {
  return {
    restrict: 'A',
    link: function (scope, element) {
      element.bind('click', function (event) {
        event.stopPropagation();
      });
    }
  };
});

angular.module('menuApp.directives').directive('keyTrap', function() {
  return function( scope, elem ) {
    elem.bind('keydown', function(event) {
      scope.$broadcast('keydown', { code: event.keyCode, ind: scope.index } );
    });
  };
}); 

angular.module('menuApp').filter('order', function() {

 return function(array, scope, string, parentIndex) {
  //console.log(scope,array,string,parentIndex);
  var filteredArray = []; 

  if(string !== null && string !== undefined){

    for(var i=0; i< array.length; i++ ){
     // console.log("i and string: ",i,string);

      if(array[i].name.indexOf(string) !== -1){

        filteredArray.push(array[i]);
      }
    }
  } else {
    filteredArray = array;
  }

  //console.log(parentIndex + ":filteredArray",filteredArray);
  //scope.focusIndex = filteredArrays[];
  scope.filteredArrays[parentIndex] = filteredArray;

  return filteredArray;
}
}); 

angular.module('menuApp').filter('searchfilter', function($sce) {

 return function(text, phrase) {
  if (phrase) text = text.replace(new RegExp('('+phrase+')', 'gi'),
    '<span class="highlighted">$1</span>')

    return $sce.trustAsHtml(text)
}
}); 