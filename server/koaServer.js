import serve from 'koa-static';
import Router from 'koa-router';
import koa from 'koa';
import Guid from 'guid';
import request from 'request';
let app = koa();
let router = new Router();

router.get('/getGuid', function*() {
	//will create a class that does all the magic here, route was just to test connection between koa and react frontend
	//get guid here and make request to api to get array of words and then do all the manipulation asked for.
	let guid = Guid.raw();
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
