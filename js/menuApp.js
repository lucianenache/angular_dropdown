'use strict';
angular.module('menuApp', ['menuApp.controllers', 'menuApp.directives' ,'ngSanitize']);

angular.module('menuApp.controllers', []).controller('menuController', function($scope) {

  $scope.focusIndex = 0;

  $scope.open = function (i,j){console.log(i,j);} 
  $scope.displayFirst = function() {$scope.focusIndex = 0;}
  
  //$scope.onKeydown = function(item, $event, outerIndex){ console.log(item,outerIndex)};
  /* refactor this one*/
  $scope.keys = [];
  $scope.keys.push({ code: 13, action: function() { $scope.open( $scope.focusIndex ); }});
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
  

  var d = [
  {
    header:"title1",  
    items :[
    { title: "Bad" },
    { title: "Good" },
    { title: "Great" },
    { title: "Cool" },
    { title: "Excellent" },
    { title: "Awesome" },
    { title: "Horrible" },
    ]
  },
  {
    header:"title2",  
    items :[
    { title: "Bad" },
    { title: "Good" },
    { title: "Great" },
    { title: "Cool" },
    { title: "Excellent" },
    { title: "Awesome" },
    { title: "Horrible" },
    ]
  }
  ];
  
  
  
  $scope.data = d;
  var par = 0;
  var parMax = d.length-1;
  
  $scope.currentParent = function (j,k){
    console.log( $scope.focusIndex,par,d[par].items.length,parMax);
    

    if(j < 0 && par > 0){
      $scope.focusIndex = d[par-1].items.length-1;
      par -=1;
      return par;
    } else
    if(j < 0 && par === 0){
      $scope.focusIndex = d[parMax].items.length-1;
      par = parMax;
      return par;
    } else 
    if(par==parMax && j > d[parMax].items.length-1){
      par = 0;
      $scope.focusIndex = 0;
      return par;
    }else
    if(j==$scope.data[par].items.length){
      $scope.focusIndex = 0;
      par +=1;
      return par;
    } 
    
    return par;
  }
  var totalIndex = function(){
    return 14;
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

angular.module('menuApp').filter('searchfilter', function($sce) {

 return function(text, phrase) {
  if (phrase) text = text.replace(new RegExp('('+phrase+')', 'gi'),
    '<span class="highlighted">$1</span>')

    return $sce.trustAsHtml(text)
}

}); 