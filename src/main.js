var _;
var log = console.log.bind(console);
var out='';

var runTests = function(){
	var s = parseableStrings;
	for(var i=0; i<s.length; i++){
		log('*********************************',i,s[i]);

		defaultParse = JSON.parse(s[i]);
		userParse = parseJSON(s[i]);
		if (!_.isEqual(userParse ,defaultParse)) {
			log('--------------------------------- default');
			log(typeof defaultParse,':',defaultParse);
			log('--------------------------------- user');
			log(typeof userParse, ':',userParse);
			log('********************************* FAILED');
			return;
		}
	}

	log('All strings pass');
}()
