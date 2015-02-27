var _;
var log = console.log.bind(console);
var out='';

var runTests = function(){
	var s = parseableStrings;
	//log('max:',s.length-1);
	log('FAILED ON:',s[9]);
	for(var i=0; i<s.length; i++){
		defaultParse = JSON.parse(s[i]);
		userParse = parseJSON(s[i]);
			log('*********************************');
			log(i,s[i]);
			log('--------------------------------- default');
			log(typeof defaultParse,':',defaultParse);
			log('--------------------------------- user');
			log(typeof userParse, ':',userParse);
			log('isEqual:',_.isEqual(userParse ,defaultParse));
	}

	log('All strings pass');
}()
