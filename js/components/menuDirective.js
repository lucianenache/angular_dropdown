// disable keypresses when writing inside the inputbox.
angular.module('menuApp').directive('myInput', function () {
  return {
    restrict: 'A',
    link: function (scope, element) {
      element.bind('click', function (event) {
        event.stopPropagation();
      });
    }
  };
});

// catch keypresses starting at button level
angular.module('menuApp').directive('keyTrap', function() {
  //console.log(a,b);
  return function(scope, elem) {
    elem.bind('keydown', function(event) {
      scope.$broadcast('keydown', { code: event.keyCode } );
    });
  };
}); 