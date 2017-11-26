process.env.PORT = 8080;
var http = require('http'),
	path = require('path'),
	chalk = require('chalk'),
	app = require('./app'),
	dataParser = require('./dataParser'),
	serveStatic = require('./serveStatic'),
	calculatorHandler = require('./calculatorHandler'),
	notFoundHandler = require('./notFoundHandler');

app.use(dataParser);
app.use(function(req,res,next){
	console.log(chalk.red(req.method) + '\t' + chalk.blue(req.urlObj.pathname));
	next();
});
app.use(serveStatic(path.join(__dirname, 'public')));
app.use(calculatorHandler);
app.use(notFoundHandler);
var port = process.env.PORT || 8080;
http.createServer(app).listen(port);
console.log('server listeninig on port'+port);