(function() {
//=============================================================================
'use strict';
window.pu = {};

var log = console.log.bind(console);
// ******************************************************************
// is string enclosed by a string pattern , a 'begin' and 'end' pattern
// eg.	'[' ']'	in ' [ 134, 34344 ] '	or '<!--' '-->'	in ' <!-- abc def ghi --> '

pu.isEnclosed = function(str, begin, end){
	var s = str.trim();
	return s.indexOf(begin) === 0 && s.lastIndexOf(end) === (s.length - end.length) ? true : false;
}

// ******************************************************************
// return the string enclosed by the begin/end pattern
pu.getEnclosed = function(str, begin, end){
	var s = str.trim();
	if ( !pu.isEnclosed(str, begin,end) ) return undefined;
	return s.slice(begin.length, s.length - end.length );
}

// ******************************************************************
// split a string at the first occurence of 'sep' pattern, return 2 element array.
pu.leftAndRightOf = function(str, sep, isTrim){
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

//=============================================================================
}());