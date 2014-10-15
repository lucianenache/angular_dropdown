'use strict';
angular.module('menuApp', ['menuApp.services', 'menuApp.controllers', 'menuApp.directives' ,'ngSanitize']);

angular.module('menuApp.controllers', []).controller('menuController', function($scope,menuService) {

  $scope.focusIndex = 0;
  $scope.datas = [];

    menuService.loadOutput(function(dataResponse) {
        //$scope.data = dataResponse;
        $scope.datas = dataResponse;
        $scope.data = $scope.datas;
        copyArr($scope.filteredArrays, $scope.datas);
        //console.log("inside service",JSON.stringify(datai));
    });

    function copyArr(a,b){
      var i,
          j,
          k;

      for(i=0;i<b;i++){
        for(j=0;j<b[i].spaces.length;j++){
          for(k=0;k<a.length;k++){
            if(a[k].id == b[i].spaces[j].id)
              //build $scope object from scratch when filtered - if filter not empty otherwise display all of them
              console.log(b[i].name,datas[i].spaces[j]);
          }
        }
      }   
      //match all objects present in b that hava a.name = b.item.name ->
    }

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
    var filteredArray = []; 


    function copyArr(a,b){
      var i,
          j,
          k;

      for(i=0;i<b.length;i++){
        for(j=0;j<b[i].spaces.length;j++){
          for(k=0;k<a.length;k++){
            if(a[k].id == b[i].spaces[j].id)
              //build $scope object from scratch when filtered - if filter not empty otherwise display all of them
              console.log(b[i].name,datas[i].spaces[j]);
          }
        }
      }   
    }

  //console.log(scope,array,string,parentIndex);
  
  if(string !== null && string !== undefined){ /* if we can filter on a string, create filtered array of spaces for one organization */
    for(var i=0; i<array.length; i++){
      if(array[i].name.indexOf(string) !== -1){

        filteredArray.push(array[i]);
      }
    }
  } else {                                      /* else it means there is no filter so provide the whole array */                                 
    filteredArray = array;
  }

  // create the array for that organization
  scope.filteredArrays[parentIndex] = filteredArray;
  //build data object and set it to the view for the users - easy index easy win
  scope.data = copyArr(scope.filteredArrays,scope.datas);
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