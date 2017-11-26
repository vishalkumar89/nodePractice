var _middlewares = [];

app.use = function(middleware){
	_middlewares.push(middleware);
}

function app(req, res){
	function exec(req, res, fns){
		var first = fns[0],
			remaining = fns.slice(1),
			next = function(){
				exec(req, res, remaining);
			};
		if (typeof first === 'function')
			first(req, res, next);
	}
	exec(req, res, _middlewares);
}

module.exports = app;