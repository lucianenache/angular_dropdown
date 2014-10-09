'use strict';
  angular.module('menuApp', ['menuApp.controllers', 'menuApp.directives' ,'ngSanitize']);

  angular.module('menuApp.controllers', []).controller('menuController', function($scope) {
    var Card, getCards, json;
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

 angular
    .module('menuApp')
    
    .filter('searchfilter', function($sce) {
     
         return function(text, phrase) {
    if (phrase) text = text.replace(new RegExp('('+phrase+')', 'gi'),
      '<span class="highlighted">$1</span>')

    return $sce.trustAsHtml(text)
  }
       
    }); 