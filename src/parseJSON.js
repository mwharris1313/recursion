// this is what you would do if you were one to do things the easy way:
// var parseJSON = JSON.parse;

// but you're not, so you'll write it from scratch:
var parseJSON = function(json) {
	// your code goes here

//	var a = parseableStrings[0]; console.log(typeof a, a);
	var isEnclosed = function(str, begin, end){
		var s = str.trim();
		return s.indexOf(begin) === 0 && s.indexOf(end) === (s.length - end.length) ? true : false;
	}

	var getEnclosed = function(str, begin, end){
		var s = str.trim();
		if ( !isEnclosed(str, begin,end) ) return undefined;
		return s.slice(begin.length, s.length - end.length );
	}

	var leftAndRightOf = function(str, sep, isTrim){
		var s = isTrim ? str.trim() : str;
		var i = s.indexOf(sep);
		var left = s.slice(0, i );
		var right = s.slice(i+sep.length, s.length ) ;
		return isTrim ? [left.trim(), right.trim()] : [left, right];
	}

	var getFirstEnclosed = function(str, begin, end){
				


	}

	var s = json.trim();
	if (s === '[]') return [];
	if (s === '{}') return {};
	if (s === 'true') return true;
	if (s === 'false') return false;
	if (!isNaN(s)) return +s;
	if ( isEnclosed(s, '{','}') ) {
		var sObj = getEnclosed(s, '{', '}');
		return leftAndRightOf(sObj, ':', true);
		//return getFirstKey(sObj);
	}

	return 'nope';

};
