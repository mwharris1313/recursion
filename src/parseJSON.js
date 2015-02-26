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

		if (s === '') return {};
		if (s.indexOf(',') === -1) { // single kv pair
			return pu.getKVPairFromString(s);

		} else { // multiple keys and values 
			var obj = {};
			var kvPairs = s.split(',');
			for(var i=0; i<kvPairs.length; i++) {
				pu.extend(obj, pu.getKVPairFromString(kvPairs[i]));
			}
			return obj;
		}
	}

};
