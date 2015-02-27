(function() {
'use strict';
//=============================================================================
var thisFile = 'parseUtil.js';
window.pu = {};
var isDebug = false;
var isLogging = false;

var log = console.log.bind(console);
// ******************************************************************
// is string enclosed by a string pattern , a 'begin' and 'end' pattern
// eg.	'[' ']'	in ' [ 134, 34344 ] '	or '<!--' '-->'	in ' <!-- abc def ghi --> '
pu.isEnclosed = function(str, begin, end){
	var thisFunc = 'isEnclosed()';
	if (isLogging) log(thisFile, thisFunc);

	var s = str.trim();
	var beginPosition = s.indexOf(begin);
	var endPosition = begin !== end ? s.indexOf(end) : s.indexOf(end, beginPosition+1);
	var dl = s.length - end.length;
	return beginPosition === 0 && endPosition === dl ? true : false;
}
//log( pu.isEnclosed('{}','{','}' ) );		// true
//log( pu.isEnclosed('{dfsf}','{','}' ) );	// true
//log( pu.isEnclosed('"dfsf"','"','"' ) );	// true


// ******************************************************************
// return the string enclosed by the begin/end pattern
pu.getEnclosed = function(str, begin, end){
	var thisFunc = 'getEnclosed()';
	if (isLogging) log(thisFile, thisFunc);

	var s = str.trim();
	if ( !pu.isEnclosed(str, begin,end) ) return undefined;
	return s.slice(begin.length, s.length - end.length );
}

// ******************************************************************
// return the string enclosed by the begin/end pattern
pu.getKVPair = function(str, begin, end, ignore){
	var thisFunc = 'getEnclosed()';
	if (isLogging) log(thisFile, thisFunc);

	var s = str.trim();
	if ( !pu.isEnclosed(str, begin,end) ) return undefined;
	return s.slice(begin.length, s.length - end.length );
}

// ******************************************************************
// split a string at the first occurence of 'sep' pattern, return 2 element array.
pu.leftAndRightOf = function(str, sep, isTrim){
	var thisFunc = 'leftAndRightOf()';
	if (isLogging) log(thisFile, thisFunc);

	var s = isTrim ? str.trim() : str;
	var i = s.indexOf(sep);
	var left = s.slice(0, i );
	var right = s.slice(i+sep.length, s.length ) ;
	return isTrim ? [left.trim(), right.trim()] : [left, right];
}

// ******************************************************************
// count repeated pattern from left/right of a 'start' position
// ' \ \\ Tbbbb  \\\\\" \\\\\\\ '
// eg. how many consecutive \ left of ", how many b right of T ? 
pu.countRepeated = function(s, pattern, start, isSearchLeft){
	var thisFunc = 'countRepeated()';
	if (isLogging) log(thisFile, thisFunc);

	var len = pattern.length;
	var count = 0;
	log(s);
	log(pattern);
	if (isSearchLeft) {
		for (var i=start-len; i>=0; i-=len){
			var sub = s.substring(i,i+len);
			if(sub === pattern) {
				count++;
			} else {
				return count;
			}
		}
	} else {
		for (var i=start+len; i<=s.length; i+=len){
			var sub = s.substring(i+1,i+len+1);
			if(sub === pattern) {
				count++;
			} else {
				return count;
			}
		}
	}

	return count;
}
//var s = ' 	we laaat aw eaaaaa:-:aaaaaaa aawfew';
//log( pu.countRepeated(s, 'aaa', s.indexOf(':-:'), false) );

// ******************************************************************
// get nth occurence of the non-escaped pattern searching from left to right.
// ' "wfeigwogwfe\\\" \\\\" ' second occurence of doubleqoute 

// Work in progress
var slash='\\';
pu.getNonEscaped = function(s, pattern , n){
	var thisFunc = 'getNonExcaped()';
	if (isLogging) log(thisFile, thisFunc);

	var count = 0;
	var numSlashes = 0;
	for (var i=0; i<s.length;i++) {
		i = s.indexOf(pattern, i);
		var numSlashes = pu.countRepeated(s, slash, i, true);
		//log('numSlashes:', numSlashes);
		if (numSlashes % 2 === 0) count++;
		if (count === n) return i;
	}

// {"key" : "value\"\","key2":"val2"}

	//count++;
}
//var s = ' "wfeigwo\\gwfe\" \\\\" ';
//log( "nonescaped:", pu.getNonEscaped(s, '"', 2) );
//log('{"key" : "value\\\"\\","key2":"val2"}');

// ******************************************************************
pu.extend = function(obj) {
	var thisFunc = 'extend()';
	if (isLogging) log(thisFile, thisFunc);

	for (var i=1; i < arguments.length; i++){
		for (var key in arguments[i]) {
			obj[key] = arguments[i][key];
		}
	}
	return obj;
};

// ******************************************************************
pu.reduce = function(collection, iterator, accumulator) {
	var thisFunc = 'reduce()';
	if (isLogging) log(thisFile, thisFunc);

	if (collection.length) {
		var acc = accumulator !== undefined ? iterator(accumulator, collection[0]) : collection[0];
		for (var i = 1; i<collection.length; i++){
			acc = iterator(acc, collection[i], i, collection);
		}
	} else if (typeof collection === "object") {
		var keys = Object.keys(collection);
		var acc = accumulator !== undefined ? iterator(accumulator, collection[keys[0]]) : collection[keys[0]];
		for (var i = 1; i<keys.length; i++){
			acc = iterator(acc, collection[keys[i]], keys[i], collection);
		}
	}
	return acc;
};

// ******************************************************************
// Determine if the array or object contains a given value (using `===`).
pu.contains = function(collection, target) {
	var thisFunc = 'contains()';
	if (isLogging) log(thisFile, thisFunc);

	// TIP: Many iteration problems can be most easily expressed in
	// terms of reduce(). Here's a freebie to demonstrate!
	return _.reduce(collection, function(wasFound, item) {
		if (wasFound) {
			return true;
		}
		return item === target;
	}, false);
};

// ******************************************************************
pu.getKVPairFromString = function(str){
	var thisFunc = 'getKVPairFromString()';
	if (isLogging) log(thisFile, thisFunc);

	var s = str.trim();
	var obj = {};
	var arr = s.split(':');

	var key = pu.isEnclosed(arr[0], '"','"') ? pu.getEnclosed(arr[0],'"','"').trim() : arr[0].trim();
	var val = pu.isEnclosed(arr[1], '"','"') ? pu.getEnclosed(arr[1],'"','"').trim() : arr[1].trim();

	if ( pu.isEnclosed(arr[0], '"','"') ){ // is key doubleqouted
		if (val === '') { 
			obj[key] = '';
		} else if (val === 'true') {
			obj[key] = true;
		} else if (val === 'false')	{
			obj[key] = false;
		} else if (val === 'null') {
			obj[key] = null;
		} else if (typeof val === 'string')	{ obj[key] = val;
		} else {
			if (isDebug) log('ERROR:',thisFile, thisFunc, 'unknown type for object value');
			obj = undefined;
		}
		return obj;
	} else { // non doubleqouted key
		if (isDebug) log('ERROR:',thisFile, thisFunc, 'no double qoutes on object key');
		return undefined;
	}

}


//=============================================================================
}());