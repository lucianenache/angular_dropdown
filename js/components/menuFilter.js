
// returns the matched subList of organizations/spaces
angular.module('menuApp').filter('search', function() {
	return function(array, scope, string, parentIndex) {
		var filteredArray = []; 
    var backUp = JSON.parse(JSON.stringify(array));



    if(string !== null && string !== undefined && string !=='') { /* if we can filter on a string, create filtered array of spaces for one organization */
      var count = 0;  
        //init outer object with empty spaces
        for(var i=0; i<array.length; i++) {
          for(var j=0; j< array[i].spaces.length;j++){
            if(array[i].spaces[j].name.indexOf(string) !== -1) {
              

              filteredArray = JSON.parse(JSON.stringify(array[i]));
              //filteredArray[count].spaces = [];

              count++;
              console.log("cpunt:"+count);
              break; //finished copying i outer array to filtered as count
            }
          } 
        }
        console.log("my stuff",filteredArray,count);
        var space=0;
        //add corresponding spaces to the matching filtered organizations
        for(var i=0; i<backUp.length; i++) {
          console.log("my stuff1",backUp[i].spaces);
          for(var j=0; j< backUp[i].spaces.length;j++){
            console.log("my stuff2",filteredArray,count);
            for(var k=0; k < count; k++){
              console.log(filteredArray[k].id,backUp[i].id,backUp[i].spaces[j].name);

              if(filteredArray[k].id == backUp[i].id && backUp[i].spaces[j].name.indexOf(string) !== -1) {
                filteredArray[k].spaces[space] = JSON.parse(JSON.stringify(backUp[i].spaces[j]));
                space++;
                console.log("my filter array",filteredArray);
              }
            }
          }

        }
      } else {                                      /* else it means there is no filter so provide the whole array */                                 
       filteredArray = backUp;
     }

  		// create the array for that organization
  		//scope.filteredArrays[parentIndex] = filteredArray;
  		//build data object and set it to the view for the users - easy index easy win
  		//scope.data = copyArr(scope.filteredArrays,scope.datas);
  		//scope.data = scope.filteredArrays;
  		return filteredArray;
  	}
  }) 


// highlights the matched letters between searched text and the spaces list
.filter('highlight', function($sce) {
	return function(text, phrase) {
		if (phrase) text = text.replace(new RegExp('('+phrase+')', 'gi'),
			'<span class="highlighted">$1</span>')
			return $sce.trustAsHtml(text)
	}
}); 