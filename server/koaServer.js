import serve from 'koa-static';
import Router from 'koa-router';
import koa from 'koa';
import Guid from 'guid';
import BlueBird from 'bluebird';
import bodyParser from 'koa-body-parser';
import parse from 'co-body';
let app = koa();
let router = new Router();

import {StringManipulator} from './main.js';
let stringManipulator = new StringManipulator();

function getWordsFiboNumber(guid, stringManipulator) {
	return new BlueBird((resolve) => {
		stringManipulator.getWordsAndFiboNumber(guid, (data) => {
			resolve({
				payload: {
					guid: guid,
					words: data.words,
					fibo: data.startingFibonacciNumber
				}
			});
		});
	});
}

function testEncodedMessage(guid, message, stringManipulator) {
	return new BlueBird((resolve) => {
		stringManipulator.postValues(guid, message, (data) => {
			resolve({
				payload: {
					encodedMessage: message,
					guid: guid,
					data: data
				}
			});
		});
	});
}

router.get('/encodeData', function*() {
	for (var i = 0; i < 25; i++) {
		let guid = Guid.raw();
		let data = yield getWordsFiboNumber(guid, stringManipulator);
		let message = stringManipulator.executeMain(data.payload.words, data.payload.fibo);
		this.body = yield testEncodedMessage(guid, message, stringManipulator);
	}
});
router.post('/secret', function*() {
	let secret = JSON.parse(this.request.body);
	this.body = {
		secret : secret.secret
	};
});

app.use(bodyParser());
app.use(router.routes());
app.use(router.allowedMethods());
app.use(serve(__dirname + '/../front'));
app.use(serve(__dirname + '/../bower_components'));

var server = app.listen(3000, function() {
	console.log('server listening to http://localhost:3000');
});
