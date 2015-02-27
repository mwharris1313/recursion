// If life was easy, we could just do things the easy way:
// var getElementsByClassName = function (className) {
//   return document.getElementsByClassName(className);
// };

// But instead we're going to implement it from scratch:
var getElementsByClassName = function(className){
	// your code here

	if (arguments[1] === undefined && arguments[2] === undefined){
		var arr = [];
		getElementsByClassName(className, document.childNodes, arr);
		return arr;
	} else {

		var fClasses = arguments[0];
		var childNodes = arguments[1];
		var arr	= arguments[2];
		var classes = fClasses.split(' ');

		if (childNodes) {
			for (var i=0; i<childNodes.length; i++){
				if (childNodes[i].className){
					var tagClasses = childNodes[i].className.split(' ');

					for (var iClasses=0; iClasses<classes.length; iClasses++){
						if ( pu.contains(tagClasses, classes[iClasses]) ){
							arr.push(childNodes[i]);
							iClasses = classes.length;
						}
					}
				}
				if (childNodes[i].childNodes) getElementsByClassName(fClasses, childNodes[i].childNodes, arr);
			}			
		}
	}

};