import serve from 'koa-static';
import Router from 'koa-router';
import koa from 'koa';
import Guid from 'guid';
import request from 'request';
let app = koa();
let router = new Router();

import {StringManipulator} from './main.js';

router.get('/getGuid', function*() {
	let stringManipulator = new StringManipulator();
	let finalValue = '';

	for (let i = 0; i < 20; i++) {
		let guid = Guid.raw();
		stringManipulator.getWordsAndFiboNumber(guid, (data) => {
			finalValue = stringManipulator.executeMain(data.words, data.startingFibonacciNumber);
			stringManipulator.postValues(finalValue, guid);
		});
	}
});


app.use(router.routes())
	.use(serve(__dirname + '/../front'))
	.use(serve(__dirname + '/../bower_components'));

var server = app.listen(3000, function() {
	console.log('server listening to http://localhost:3000');
});
