var pu; // lib/parseUtil.js
// this is what you would do if you were one to do things the easy way:
// var parseJSON = JSON.parse;
// but you're not, so you'll write it from scratch:



var parseJSON = function(json) {
	// your code goes here

	// Arrays
	if ( pu.isEnclosed(json,'[',']') ){
		var s = pu.getEnclosed(json,'[',']');
		var arr = s.split(',');
		var obj = {};

		if (s === '') return [];

		for (var i=0; i<arr.length; i++) {
			if (pu.isEnclosed(arr[i],'"','"')) { // isString
				arr[i] = pu.getEnclosed(arr[i], '"','"'); 
			} else if (arr[i] === 'true') {
				arr[i] = true;
			} else if (arr[i] === 'false') {
				arr[i] = false;
			} else if (arr[i] === 'null') {
				arr[i] = null;
			}
		}
		return arr;
 
	}

	// Objects
	if ( pu.isEnclosed(json,'{','}') ){
		var s = pu.getEnclosed(json,'{','}');

		if (s === '') return {};
		if (s.indexOf(',') === -1) { return pu.getKVPairFromString(s); } // single kv pair
		else { // multiple kv pairs
			var obj = {};
			var kvPairs = s.split(',');
			for(var i=0; i<kvPairs.length; i++) {
				pu.extend(obj, pu.getKVPairFromString(kvPairs[i]));
			}
			return obj;
		}
	}

};
