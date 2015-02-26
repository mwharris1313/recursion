var log = console.log.bind(console);
var out='';

var runTests = function(){
	var s = parseableStrings;
	for(var i=0; i<s.length; i++){
		defaultParse = JSON.parse(s[i]);
		userParse = parseJSON(s[i]);
		if (userParse !== defaultParse) {
			log('*********************************');
			log('FAILED ON:');
			log('*********************************');
			log(s[i]);
			return;
		}
	}

	log('All strings pass');

}()