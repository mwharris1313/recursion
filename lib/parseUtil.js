(function() {
//=============================================================================
'use strict';
window.pu = {};

pu.isEnclosed = function(str, begin, end){
	var s = str.trim();
	return s.indexOf(begin) === 0 && s.indexOf(end) === (s.length - end.length) ? true : false;
}

pu.getEnclosed = function(str, begin, end){
	var s = str.trim();
	if ( !pu.isEnclosed(str, begin,end) ) return undefined;
	return s.slice(begin.length, s.length - end.length );
}

pu.leftAndRightOf = function(str, sep, isTrim){
	var s = isTrim ? str.trim() : str;
	var i = s.indexOf(sep);
	var left = s.slice(0, i );
	var right = s.slice(i+sep.length, s.length ) ;
	return isTrim ? [left.trim(), right.trim()] : [left, right];
}

pu.getFirstEnclosed = function(str, begin, end){
			


}

//=============================================================================
}());