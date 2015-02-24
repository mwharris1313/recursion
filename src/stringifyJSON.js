// this is what you would do if you liked things to be easy:
// var stringifyJSON = JSON.stringify;

// but you don't so you're going to write it from scratch:
var stringifyJSON = function(obj) {
	// your code goes here

	if (obj === null) return 'null';
	if (typeof obj === 'boolean') return obj.toString();
	if (typeof obj === 'number') return obj.toString();
	if (typeof obj === 'string') return '"' + obj + '"';

	if (typeof obj === 'object' && obj.length === 0) return '[]';
	if (typeof obj === 'object' && obj.length > 0) {
		var s = '';
		for(var i=0; i<obj.length; i++){
			var item = obj[i];
			if (typeof item !== 'function' && typeof item !== 'symbol' && item !== undefined){
				s += stringifyJSON(obj[i]) + ',';
			} else {
				s += 'null' + ',';				
			}
		}

		var isCommaOnEnd = s[s.length-1] === ',';
		return '['+ (isCommaOnEnd ? s.slice(0,-1):s) +']';	
	}

	if (typeof obj === 'object' && obj.length === undefined) {
		var keys = Object.keys(obj);
		if (keys.length === 0) return '{}';
		var s = '';
		for(var i=0; i<keys.length; i++){
			var item = obj[keys[i]];
			if (typeof item !== 'function' && typeof item !== 'symbol' && item !== undefined){
				s += '"'+keys[i]+'":' + stringifyJSON(obj[keys[i]]) + (i < keys.length-1 ? ',':'');
			}
		}

		var isCommaOnEnd = s[s.length-1] === ',';
		return '{'+ (isCommaOnEnd ? s.slice(0,-1):s) +'}';	

	}

};
