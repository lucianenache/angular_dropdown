angular.module('menuApp').controller('menuController', function($scope,menuService,searchFilter) {

  $scope.focusIndex = 0;      // this one is used to determine the current item to highlight
  $scope.filteredArrays = []; // should containt a copy of the original data with only the filtered items
  var parentIndex = 0;                // initialize parentArray index 
  var mainData = [];
  // load json data
  menuService.loadOutput(function(dataResponse) {
      $scope.data = dataResponse;
      mainData = $scope.data;
  });


  // this is triggered when enter is pressed
  $scope.open = function (parentInd,focusInd){
    // find corresponding space name - lookup to find real indexes
    // Enter/Return should go to the link of the active element. 
    // maybe use a different way to store the data - uniquer array ?

    console.log("called item: "+$scope.data[parentIndex].spaces[focusInd].name);
  } 

  // init the highlight on the first element
  $scope.displayFirst = function() {$scope.focusIndex = 0;}
  
  $scope.$watch('searchSpaceName',function(searchSpaceName,$scope){
    //console.log('text changed1 ',searchSpaceName);
    if(searchSpaceName != undefined || searchSpaceName != null || searchSpaceName != ''){
      console.log('text changed1 ',mainData,  searchSpaceName);
      data = searchFilter(mainData, $scope, searchSpaceName, -1);
      console.log('text changed2 ',data);
      //$scope.$apply();
    }
    data = mainData;
  });
   
 $scope.$on('keydown', function( msg, obj ) {
  // the focus index is the original one and not the one of the filtered list - must fix
  $scope.keysMapping = [];
  $scope.keysMapping.push({ code: 13, action: function() { $scope.open($scope.parentIndex,$scope.focusIndex); }}); 
  $scope.keysMapping.push({ code: 38, action: function() { $scope.focusIndex--; }});
  $scope.keysMapping.push({ code: 40, action: function() { $scope.focusIndex++; }});


  // determine real indexes for the item to call
  // it should be done here 
  var code = obj.code;
  $scope.keysMapping.forEach(function(o) {
      if ( o.code !== code ) { return; }
      o.action();
      $scope.$apply();
    });
  });

  
  // here I determine which item should be highlighted even in case of filteredArray  
  // f p l m 
  // 0 0 2 1
  // 1 0 2 1
  $scope.currentParent = function (focusIndex,currentIndex){
    
    var parMax =  $scope.data.length-1;
    console.log($scope.focusIndex, parentIndex, $scope.data[parentIndex].length, parMax);
  

    if(focusIndex < 0 && parentIndex > 0){
      $scope.focusIndex = $scope.data[parentIndex-1].length-1;
      console.log($scope.data[parentIndex-1].length);console.log("enter 1");
      parentIndex -=1;
      return paparentIndexr;
    } else
    if(focusIndex < 0 && parentIndex === 0){
      $scope.focusIndex = $scope.data[parMax].length-1;
      parentIndex = parMax;console.log("enter 2");
      return parentIndex;
    } else 
    if(parentIndex==parMax && focusIndex > $scope.data[parMax].length-1){
      parentIndex = 0;console.log("enter 3");
      $scope.focusIndex = 0;
      return parentIndex;
    }else
    if(focusIndex == $scope.data[parentIndex].length){
      console.log("enter 4");
      $scope.focusIndex = 0;
      parentIndex += 1;
      return parentIndex;
    } 
    return parentIndex;
  }
});