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
		var isNumeric = false;

		var keyStart = false;
		var keyEnd = false;
		var key = undefined;

		var valStart = false;
		var valEnd = false;
		var val = undefined;
		var valType = undefined;
		var isNumeric = false;

		var commaReset = function(){
			// ------------------ comma reset for key/value
			if (isObj) {
				keyStart = false;
				keyEnd = false;
				key = undefined;				
			}

			// reset val for both arrays and objects
			valStart = true;
			valEnd = false;
			val = undefined;
			valType = undefined;
			isNumeric = false;
		}

		var logVars = function(){
			if (isDebug) {
				log('################################ START LOG');
				log('var s = ',s);
				log('var p = ',p);
				log('var o = ',o);
				log('var s[p] = ',s[p]);

				log('var itemStarted = ',itemStarted);
				log('var itemEnded = ',itemEnded);
				log('var itemType = ',itemType);

				log('var isArr = ',isArr);
				log('var isObj = ',isObj);

				log('var keyStart = ',keyStart);
				log('var keyEnd = ',keyEnd);
				log('var key = ',key);

				log('var valStart = ',valStart);
				log('var valEnd = ',valEnd);
				log('var val = ',val);
				log('var valType = ',valType);
				log('var isNumeric = ',isNumeric);
				log('################################ END LOG');
			}
		}


		for (; p<s.length ;p++) { // run through the json string left to right checking for 'trigger' characters

			// ------------------------------------------------------------------ ARRAY INIT
			if (s[p]==='[' && !isArr && !isObj){ // array start
				o = [];
				valStart = true;
				isArr = true;

			// ------------------------------------------------------------------ ARRAY HANDLE RECURSION
			} else if (s[p]==='[' && (isArr||isObj)){ // object start
				valEnd = true;
				if (isArr) o.push(parseJSON(s, p));
				if (isObj) o[key] = parseJSON(s, p);

			// ------------------------------------------------------------------ OBJECT INIT
			} else if (s[p]==='{' && !isArr && !isObj){ // object start
				o = {};
				isObj = true;

			// ------------------------------------------------------------------ OBJECT HANDLE RECURSION
			} else if (s[p]==='{' && (isArr||isObj)){ // object start
				valEnd = true;
				if (isArr) o.push(parseJSON(s, p));
				if (isObj) o[key] = parseJSON(s, p);

			// ------------------------------------------------------------------ ARRAY HANDLING
			} else if (s[p]===']' && isArr && valType!=='detecting') { // array end
				return o;

//			} else if (s[p] === '"' && itemStarted && itemType === 'array') { // array end
//				return o;

			// ------------------------------------------------------------------ OBJECT HANDLING
			} else if (s[p]==='}' && isObj && valType!=='detecting') { // object end
				return o;

			} else if (s[p]==='"' && isObj && !keyStart) { // object key start
				keyStart = true;
				key = '';
			} else if (s[p]!=='"' && isObj && keyStart && !keyEnd) { // object key progressing
				key += s[p];
				if (isDebug) log('KEY PROGRESSING:', val);

			} else if (s[p]==='"' && isObj && !keyEnd) { // object key end
				keyEnd = true;
				if (isDebug) log('KEY:',key);

			} else if (s[p]===':' && isObj && keyEnd && !valStart) { // object val start
				valStart = true;

			// ------------------------------------------------------------------ SHARED HANDLING


			// ------------------ handle valType string
			} else if (s[p]==='"' && (isArr||isObj) && valStart && valType === undefined) { // val type string
				valType = 'string';
				val = '';

			} else if (s[p]!=='"' && (isArr||isObj) && !valEnd && valType === 'string') { // val type string progressing
				val += s[p];
				if (isDebug) log('VAL STRING PROGRESSING:', val);

			} else if (s[p]==='"' && (isArr||isObj) && !valEnd && valType === 'string') { // val type string end
				valEnd = true;
				if (isDebug) log('VAL STRING:', val);
				if (isArr) o.push(val);
				if (isObj) o[key] = val;

			// ------------------ handle/detect unknown val type

			// -------- isAlpha chars
			} else if (pu.isAlpha(s[p]) && (isArr||isObj) && valStart && valType === undefined) { // val type unknown detect start
				valType = 'detecting';
				val = s[p];
				if (isDebug) log('VAL DETECT STARTING:', val);

			} else if (pu.isAlpha(s[p]) && (isArr||isObj) && valStart && valType === 'detecting') {	// val type unknown detect progressing
				val += s[p];
				if (isDebug) log('VAL DETECT PROGRESSING:', val);


			// -------- isNumeric chars
			} else if (pu.isNumeric(s[p]) && (isArr||isObj) && valStart && valType === undefined) { // val type unknown detect start
				isNumeric = true;
				valType = 'detecting';
				val = s[p];
				if (isDebug) log('VAL DETECT STARTING:', val);

			} else if (pu.isNumeric(s[p]) && (isArr||isObj) && valStart && valType === 'detecting') {	// val type unknown detect progressing
				val += s[p];
				if (isDebug) log('VAL DETECT PROGRESSING:', val);


			// ------------------ end detection

			} else if (s[p]===',' && (isArr||isObj) && valStart && valType === 'detecting') { // val type unknown detect end
				valEnd = true;
				if (val==='true') { val = true; valType = 'boolean'; }
				if (val==='false') { val = false; valType = 'boolean'; }
				if (val==='null') { val = null; valType = 'null'; }
				if (val==='undefined') { val = undefined; valType = 'undefined'; }
				if (isNumeric) { val = +val; valType = 'number'; }
				log('VAL DETECT END: [', valType,']',val);
				if (isArr) o.push(val);
				if (isObj) o[key] = val;
				commaReset();

			} else if ( (s[p]===']' || s[p]==='}') && (isArr||isObj) && valStart && valType === 'detecting') { // val type unknown detect end
				valEnd = true;
				if (val==='true') { val = true; valType = 'boolean'; }
				if (val==='false') { val = false; valType = 'boolean'; }
				if (val==='null') { val = null; valType = 'null'; }
				if (val==='undefined') { val = undefined; valType = 'undefined'; }
				if (isNumeric) { val = +val; valType = 'number'; }
				if (isDebug) log('VAL DETECT END: [', valType,']',val);
				if (isArr) o.push(val);
				if (isObj) o[key] = val;
				return o;


			} else if (s[p]===',' && (isArr||isObj) && valEnd){
				commaReset();

			// ------------------------------------------------------------------ NON HANDLED CHARACTERS
			// whitespace and other non "trigger" characters...

			} else {
			}
		}

	}

};
