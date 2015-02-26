var _;
var log = console.log.bind(console);
var out='';

var runTests = function(){
	var s = parseableStrings;
	for(var i=0; i<s.length; i++){
		defaultParse = JSON.parse(s[i]);
		userParse = parseJSON(s[i]);
		if (!_.isEqual(userParse ,defaultParse)) {
			log('*********************************');
			log('FAILED ON:');
			log('*********************************');
			log(i,s[i]);
			log('--------------------------------- default');
			log(typeof defaultParse,':',defaultParse);
			log('--------------------------------- user');
			log(typeof userParse, ':',userParse);
			log('*********************************');

			return;
		}
	}

	log('All strings pass');

}()