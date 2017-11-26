var url = require('url'),
	querystring = require('querystring');

module.exports = function(req, res, next){
	var urlObj = url.parse(req.url);
	req.urlObj = urlObj;
	req.query = querystring.parse(urlObj.query);
	if (req.method === 'GET'){
		next();
	} else {
		var rawData = '';
		req.on('data', function(contents){
			rawData += contents;
		});
		req.on('end', function(){
			req.body = querystring.parse(rawData);
			next();
		});
	}
};