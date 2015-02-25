var pu; // lib/parseUtil.js
// this is what you would do if you were one to do things the easy way:
// var parseJSON = JSON.parse;
// but you're not, so you'll write it from scratch:
var parseJSON = function(json) {
	// your code goes here
	// var a = parseableStrings[0]; console.log(typeof a, a);

	var s = json.trim();
	if (s === '[]') return [];
	if (s === '{}') return {};
	if (s === 'true') return true;
	if (s === 'false') return false;
	if (!isNaN(s)) return +s;
	if ( pu.isEnclosed(s, '{','}') ) {
		var sObj = pu.getEnclosed(s, '{', '}');
		return pu.leftAndRightOf(sObj, ':', true);
		//return getFirstKey(sObj);
	}

	return 'nope';

};
