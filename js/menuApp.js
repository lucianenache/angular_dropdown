'use strict';
  angular.module('menuApp', ['menuApp.controllers', 'menuApp.directives' ,'ngSanitize']);

  angular.module('menuApp.controllers', []).controller('menuController', function($scope) {
    
    $scope.focusIndex = 0;

   $scope.open = function (i){console.log(i)} 
  
  /* refactor this one*/
  $scope.keys = [];
  $scope.keys.push({ code: 13, action: function() { $scope.open( $scope.focusIndex ); }});
  $scope.keys.push({ code: 38, action: function() { $scope.focusIndex--; }});
  $scope.keys.push({ code: 40, action: function() { $scope.focusIndex++; }});
  
  $scope.$on('keydown', function(msg, obj) {
    var code = obj.code;
    $scope.keys.forEach(function(o) {
      if ( o.code !== code ) { return; }
        o.action();
        if($scope.focusIndex<0){
          $scope.focusIndex=$scope.data.length-1;
        }else if($scope.focusIndex >$scope.data.length-1){
          $scope.focusIndex=0;
        }
      $scope.$apply();
    });
  });

     $scope.data = [
            { title: "Bad" },
            { title: "Good" },
            { title: "Great" },
            { title: "Cool" },
            { title: "Excellent" },
            { title: "Awesome" },
            { title: "Horrible" },
          ]
   

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
    elem.bind('keydown', function( event ) {
      scope.$broadcast('keydown', { code: event.keyCode } );
    });
  };
 }); 

 angular
    .module('menuApp')
    
    .filter('searchfilter', function($sce) {
     
         return function(text, phrase) {
    if (phrase) text = text.replace(new RegExp('('+phrase+')', 'gi'),
      '<span class="highlighted">$1</span>')

    return $sce.trustAsHtml(text)
  }
       
    }); 