var pu; // lib/parseUtil.js
// this is what you would do if you were one to do things the easy way:
// var parseJSON = JSON.parse;
// but you're not, so you'll write it from scratch:



var parseJSON = function(json) {
	// your code goes here
	if ( pu.isEnclosed(json,'[',']') ){
		var s = pu.getEnclosed(json,'[',']');
		var arr = s.split(',');
		var obj = {};

		if (s === '') return [];

		for (var i=0; i<arr.length; i++) {
			arr[i] = pu.getEnclosed(arr[i], '"','"');
		}
		return arr;
 
	}

	if ( pu.isEnclosed(json,'{','}') ){
		var s = pu.getEnclosed(json,'{','}');
		var arr = s.split(':');
		var obj = {};

		if (s === '') return {};
		if (arr.length === 2) { // key and value
			if ( pu.isEnclosed(arr[0], '"','"') ){
				if ( pu.isEnclosed(arr[1], '"','"') ){
					obj[ pu.getEnclosed(arr[0],'"','"') ] = pu.getEnclosed(arr[1],'"','"');
					return obj;
				} else {

				}
			}

		} else if (arr.length > 2) { // multiple keys and values 
			log('yep');
		}
	}

};
