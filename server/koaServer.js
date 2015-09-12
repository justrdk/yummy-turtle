var serve = require('koa-static');
var router = require('koa-router')();
var koa = require('koa');
var app = koa();
var Guid = require('guid');

//routes
router.get('/getGuid', function*() {
	var guid = Guid.raw();
	this.body = {
		payload: guid
	};
});


app.use(router.routes())
	.use(serve(__dirname + '/../front'))
	.use(serve(__dirname + '/../bower_components'));

var server = app.listen(3000, function() {
	console.log('server listening to http://localhost:3000');
});
