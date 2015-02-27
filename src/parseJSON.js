var pu; // lib/parseUtil.js
// this is what you would do if you were one to do things the easy way:
// var parseJSON = JSON.parse;
// but you're not, so you'll write it from scratch:
var isDebug = true;

var parseJSON = function(json) {

	if (arguments[1] === undefined) { // first run
		return parseJSON(json, 0);

	} else {
		var s = arguments[0]; // json string
		var p = arguments[1]; // current position in string
		var o = undefined; // parent object

		var itemStarted = false;
		var itemEnded = false;
		var itemType = undefined;

		var isArr = false;
		var isObj = false;

		var keyStart = false;
		var keyEnd = false;
		var key = undefined;

		var valStart = false;
		var valEnd = false;
		var val = undefined;
		var valType = undefined;

		for (; p<s.length ;p++) { // run through the json string left to right checking for 'trigger' characters

			// ------------------------------------------------------------------ ARRAY INIT
			if (s[p]==='[' && !isArr && !isObj){ // array start
				o = [];
				valStart = true;
				isArr = true;

			// ------------------------------------------------------------------ OBJECT INIT
			} else if (s[p]==='{' && !isArr && !isObj){ // object start
				o = {};
				isObj = true;

			// ------------------------------------------------------------------ ARRAY HANDLING
			} else if (s[p]===']' && isArr) { // array end
				return o;

//			} else if (s[p] === '"' && itemStarted && itemType === 'array') { // array end
//				return o;

			// ------------------------------------------------------------------ OBJECT HANDLING
			} else if (s[p]==='}' && isObj) { // object end
				return o;

			} else if (s[p]==='"' && isObj && !keyStart) { // object key start
				keyStart = true;
				key = '';
			} else if (s[p]!=='"' && isObj && keyStart && !keyEnd) { // object key progressing
				key += s[p];

			} else if (s[p]==='"' && isObj && !keyEnd) { // object key end
				keyEnd = true;
				if (isDebug) log('KEY:',key);

			} else if (s[p]===':' && isObj && keyEnd && !valStart) { // object val start
				valStart = true;

			// ------------------------------------------------------------------ SHARED HANDLING
			} else if (s[p]==='"' && (isArr||isObj) && valStart && valType === undefined) { // val type string
				valType = 'string';
				val = '';

			} else if (s[p]!=='"' && (isArr||isObj) && !valEnd && valType === 'string') { // val type string progressing
				val += s[p];
				if (isDebug) log('VAL PROGRESSING:', val);

			} else if (s[p]==='"' && (isArr||isObj) && !valEnd && valType === 'string') { // val type string end
				valEnd = true;
				if (isDebug) log('VAL:', val);
				if (isArr) o.push(val);
				if (isObj) o[key] = val;

			} else if (s[p]===',' && (isArr||isObj) && valEnd){

				if (isArr) {
					valStart = true;
					valEnd = false;
					val = undefined;
					valType = undefined;
				}

				if (isObj) {
					keyStart = true;
					keyEnd = false;
					key = undefined;				
				}

			// ------------------------------------------------------------------ NON HANDLED CHARACTERS
			// whitespace and other non "trigger" characters...

			} else {
			}
		}

	}

};
