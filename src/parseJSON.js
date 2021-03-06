var thisFile = 'parseJSON.js';
var pu; // lib/parseUtil.js
// this is what you would do if you were one to do things the easy way:
// var parseJSON = JSON.parse;
// but you're not, so you'll write it from scratch:
var isDebug = false;
var DEBUG_s = '';
var dbg = function(){
 	if (isDebug) {
 		log('DEBUG',arguments);
 	}
 }

// ==========================================================================================
var parseJSON = function(json) {
var s = arguments[0]; // json string
var p = arguments[1]; // current position in string
var o = undefined; // parent object
// ##########################################################################################

	// ********************************************************************
	var checkChar = function(s,p){
		var thisFunc = 'checkChar()';
		dbg(thisFile, thisFunc, arguments);
	
		p = pu.getNextNonWhiteSpace(s,p);
		DEBUG_s += s[p];
		dbg('s',DEBUG_s);

		if (s[p]==='[') {
			var temp = getArray(s,p);
			return [temp[0],temp[1],temp[3]];

		} else if (s[p]==='{') {
			var temp = getObject(s,p);
			return [temp[0],temp[1],temp[3]];
		}

	}

	// ********************************************************************
	var getArray = function(s,p){
		var thisFunc = 'getArray()';
		dbg(thisFile, thisFunc, arguments);

		var checkForMore = function(){

			p = pu.getNextNonWhiteSpace(s,p);
			if (s[p]!==',' && s[p]!==']') throw  new SyntaxError('Uncaught SyntaxError: Unexpected end of input');
			if (s[p]===']') p--;

		}

		if (s[p]==='[') var ret = [];

		while (true) {
			p = pu.getNextNonWhiteSpace(s,p);
			DEBUG_s += s[p];
			dbg('s',DEBUG_s);

			if (s[p]===']') {
				return [ret,p];

			} else if (s[p]==='{') {
				var val = getObject(s,p);
				p = val[1];
				dbg('val',val);
				ret.push(val[0]);
				checkForMore();

			} else if (s[p]==='[') {
				var val = getArray(s,p);
				p = val[1];
				dbg('val',val);
				ret.push(val[0]);
				checkForMore();

			} else if (s[p]==='"') {			// start string
				var val = getString(s,p);
				p = val[1];
				dbg('val',val);
				ret.push(val[0]);
				checkForMore();

			} else if (pu.isAlpha(s[p])) {		// start alpha word
				var val = getAlpha(s,p);
				p = val[1];
				dbg('val',val);
				ret.push(val[0]);
				checkForMore();

			} else if (pu.isNumeric(s[p])) {	// start numeric word
				var val = getNumeric(s,p);
				p = val[1];
				dbg('val',val);
				ret.push(val[0]);
				checkForMore();

			} else {
				if (p > s.length) break;
			}
		}

	}

	// ********************************************************************
	var getObject = function(s,p){
		var thisFunc = 'getObject()';
		dbg(thisFile, thisFunc, arguments);

		var checkForMore = function(){

			p = pu.getNextNonWhiteSpace(s,p);
			if (s[p]!==',' && s[p]!=='}') dbg('ERROR: array missing right brace "}"', s,s[p],p);
			if (s[p]==='}') p--;

		}

		if (s[p]==='{') var ret = {};
		var isKey = true;

		while(true) {
			p = pu.getNextNonWhiteSpace(s,p);
				DEBUG_s += s[p];
				dbg('s',DEBUG_s);

			if (s[p]==='}') {
				return [ret,p];

			} else if (s[p]==='"') {			// start string

				if (isKey) {					// is key
					var key = getString(s,p);
					p = key[1];
					dbg('key',key);

					p = pu.getNextNonWhiteSpace(s,p);
					if (s[p]===':') {
						p = pu.getNextNonWhiteSpace(s,p);

						//================================= handle value of kv pair
						if (s[p]==='"'){					// start string
							var val = getString(s,p);
							p = val[1];
							dbg('val',val);

						} else if (pu.isAlpha(s[p])) {		// start alpha word
							var val = getAlpha(s,p);
							p = val[1];
							dbg('val',val);

						} else if (pu.isNumeric(s[p])) {	// start numeric word
							var val = getNumeric(s,p);
							p = val[1];
							dbg('val',val);

						} else if (s[p]==='{') {			// start object
							var val = getObject(s,p);
							p = val[1];
							dbg('val',val);

						} else if (s[p]==='[') {			// start array
							var val = getArray(s,p);
							p = val[1];
							dbg('val',val);

						} else {
							dbg('ERROR: unknown value type on Key/Value Pair', s,s[p],p);
						}

					} else {
						dbg('ERROR: colon not found on Key/Value Pair', s,s[p],p);
					}

					ret[key[0]] = val[0];
					checkForMore();

				}

			} else {
				if (p > s.length) break;
			}
		}

	}

	// ********************************************************************
	var getString = function(s,p){
		var thisFunc = 'getString()';
		dbg(thisFile, thisFunc, arguments);

		var isComplete = false;
		var str = '';

		while(true){

			p++;
			if (s[p]==='\\') {
				p++;
				var temp = '';
				if (s[p]==='\\'){
					temp = '\\';
				} else if (s[p]==='"') {
					temp = '"';
				} else {
					temp = s[p];
				}
				str += temp;
			} else if (s[p]==='"'){
				if (!isComplete){
					isComplete = true;
					return [str,p];
				}

			} else {

				str += s[p];
				if (p > s.length) throw new SyntaxError('Uncaught SyntaxError: Unexpected end of input');

			}
		}

	}

	// ********************************************************************
	var getAlpha = function(s,p){
		var thisFunc = 'getAlpha()';
		dbg(thisFile, thisFunc, arguments);

		var isComplete = false;
		var str = '';

		while(true){

			// broke consecutive letters, word is complete
			if (pu.isWhiteSpace(s[p]) || s[p]===',' || s[p]===']' || s[p]==='}') {
				if (!isComplete){
					isComplete = true;
					dbg('ALPHA str:',str);
					var val;
					if (str==='null'){
						val = null;
					} else if (str==='false') {
						val = false;
					} else if (str==='true') {
						val = true;
					} else if (str==='undefined') {
						val = undefined;
					} else {
						dbg('ERROR: Unknown Alpha word', str, s,s[p],p);
					}
					p--;
					return [val,p];
				}

			} else {
				str += s[p];
				if (p > s.length) break;
			}
			p++;

		}

	}

	// ********************************************************************
	var getNumeric = function(s,p){
		var thisFunc = 'getNumeric()';
		dbg(thisFile, thisFunc, arguments);

		var isComplete = false;
		var str = '';

		while(true){

			// broke consecutive letters, word is complete
			if (pu.isWhiteSpace(s[p]) || s[p]===',' || s[p]===']' || s[p]==='}') {
				if (!isComplete){
					isComplete = true;
					dbg('NUMERIC str:',str);
					var val = +str;
					p--;
					return [val,p];
				}

			} else {
				str += s[p];
				if (p > s.length) break;
			}
			p++;

		}

	}
// ##########################################################################################
if (arguments[1] === undefined) { // first run
	// parseJSON return a 2-part array:
	// arr[0] the "return object" , arr[1] last known position in string

	var retFinal = parseJSON(json, -1);
	log("RETFINAL: ", retFinal);
	return retFinal;

} else {
	var ret = checkChar(s,p);
	return ret[0];
}
// ##########################################################################################
}
// ==========================================================================================

