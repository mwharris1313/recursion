var pu; // lib/parseUtil.js
// this is what you would do if you were one to do things the easy way:
// var parseJSON = JSON.parse;
// but you're not, so you'll write it from scratch:



var parseJSON = function(json) {
	// your code goes here
	if (json === '[]') return [];

	if ( pu.isEnclosed(json,'{','}') ){
		var s = pu.getEnclosed(json,'{','}');
		var arr = s.split(':');
		var obj = {};
		if (arr.length === 2) {
			if ( pu.isEnclosed(arr[0], '"','"') ){
				if ( pu.isEnclosed(arr[1], '"','"') ){
					obj[ pu.getEnclosed(arr[0],'"','"') ] = pu.getEnclosed(arr[1],'"','"');
					return obj;
				} else {

				}
			}

		}
	}

	log('"asd"fffsfe" '.lastIndexOf('"'));
};
