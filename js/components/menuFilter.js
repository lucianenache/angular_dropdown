
// returns the matched subList of organizations/spaces
angular.module('menuApp').filter('search', function() {
	return function(array, scope, string, parentIndex) {
		var filteredArray = []; 

  		//console.log(scope,array,string,parentIndex);
  		if(string !== null && string !== undefined) { /* if we can filter on a string, create filtered array of spaces for one organization */
  			for(var i=0; i<array.length; i++) {
  				if(array[i].name.indexOf(string) !== -1) {
  					filteredArray.push(array[i]);
  				}
  			}
  		} else {                                      /* else it means there is no filter so provide the whole array */                                 
  			filteredArray = array;
  		}

  		// create the array for that organization
  		scope.filteredArrays[parentIndex] = filteredArray;
  		//build data object and set it to the view for the users - easy index easy win
  		//scope.data = copyArr(scope.filteredArrays,scope.datas);
  		scope.data = scope.filteredArrays;
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