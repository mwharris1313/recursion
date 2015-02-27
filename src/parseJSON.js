var pu; // lib/parseUtil.js
// this is what you would do if you were one to do things the easy way:
// var parseJSON = JSON.parse;
// but you're not, so you'll write it from scratch:

var parseJSON = function(json) {
	// your code goes here
	if (arguments[1] === undefined) { // first run
		return parseJSON(json, 0, null);

	} else {
		var s = arguments[0]; // json string
		var p = arguments[1]; // current position in string
		var o = arguments[2]; // parent object

		var itemStarted = false;
		var itemEnded = false;
		var itemType = undefined;
		var keyStart = false;
		var keyEnd = false;
		var key = undefined;
		var valStart = false;
		var valEnd = false;
		var val = undefined;
		var valType = undefined;

		for (; p<s.length ;p++) {

			if (s[p] === '[' && !itemStarted){ // array start
				itemStarted = true;
				itemType = 'array';
				o = [];
			} else if (s[p] === ']' && itemStarted && itemType === 'array') { // array end
				return o;

			} else if (s[p] === '{' && !itemStarted){ // object start
				itemStarted = true;
				itemType = 'object';
				o = {};
			} else if (s[p] === '}' && itemStarted && itemType === 'object') { // object end
				if (valEnd) o[key] = val;
				return o;

			} else if (s[p] === '"' && itemType === 'object' && !keyStart) { // object key start
				keyStart = true;
				key = '';
			} else if (s[p] !== '"' && keyStart && !keyEnd) { // object key progressing
				key += s[p];

			} else if (s[p] === '"' && !keyEnd) { // object key end
				keyEnd = true;
				log('KEY:',key);

			} else if (s[p] === ':' && keyEnd && !valStart) { // object val start
				valStart = true;

			} else if (s[p] === '"' && valStart && valType === undefined) { // object val type string
				valType = 'string';
				val = '';

			} else if (s[p] !== '"' && !valEnd && valType === 'string') { // object val type string progressing
				val += s[p];

			} else if (s[p] === '"' && !valEnd && valType === 'string') { // object val type string end
				valEnd = true;
				log('VAL:', val);

			} else {
			}
		}

	}

};
