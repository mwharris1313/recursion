(function() {
'use strict';
var thisFile = 'parseUtil.js';
//=============================================================================
window.pu = {};
var isDebug = false;
var isLogging = false;
var log = console.log.bind(console);
// ******************************************************************
pu.template = function(arg1) {
	var thisFunc = 'template()';
	if (isLogging) log(thisFile, thisFunc, arguments);
}

// ******************************************************************
pu.isWhiteSpace = function(s){
	var thisFunc = 'isWhiteSpace()';
	if (isLogging) log(thisFile, thisFunc, arguments);
	return /\s/g.test(s);
}

// ******************************************************************
pu.getNextNonWhiteSpace = function(s,p){
	var thisFunc = 'getNextNonWhiteSpace()';
	if (isLogging) log(thisFile, thisFunc, arguments);
	p++;
	for(; pu.isWhiteSpace(s[p]); p++){}
	return p;
}

// ******************************************************************
pu.isAlpha = function(ch) {
	var thisFunc = 'isAlpha()';
	if (isLogging) log(thisFile, thisFunc, arguments);
	return pu.contains('abcdefghijklmnopqrstuvwxyz',ch.toLowerCase());
}

// ******************************************************************
pu.isNumber = function(ch) {
	var thisFunc = 'isNumber()';
	if (isLogging) log(thisFile, thisFunc, arguments);
	return pu.contains('0123456789',ch.toLowerCase());
}

// ******************************************************************
pu.isNumeric = function(ch) {
	var thisFunc = 'isNumeric()';
	if (isLogging) log(thisFile, thisFunc, arguments);
	return pu.contains('+-.0123456789',ch.toLowerCase());
}

// ******************************************************************
pu.reduce = function(collection, iterator, accumulator) {
	var thisFunc = 'reduce()';
	if (isLogging) log(thisFile, thisFunc, arguments);

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
	if (isLogging) log(thisFile, thisFunc, arguments);

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

//=============================================================================
}());