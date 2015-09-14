import serve from 'koa-static';
import Router from 'koa-router';
import koa from 'koa';
import Guid from 'guid';
import BlueBird from 'bluebird';
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
					words: data.words.join(","),
					fibo: data.startingFibonacciNumber
				}
			});
		});
	});
}

router.get('/getData', function*() {
		let guid = Guid.raw();
		let responseData = {
			guid: guid,
			words: [],
			message: ''
		};
		this.body = yield getWordsFiboNumber(guid, stringManipulator);
	})
	.get('/getEncodedMessage', function*() {
		let words = this.query.words;
		let fibo = this.query.fibo;
		let message = stringManipulator.executeMain(words, fibo);

		this.body = {
			payload: {
				encodedMessage: message
			}
		};
	});

app.use(router.routes())
	.use(serve(__dirname + '/../front'))
	.use(serve(__dirname + '/../bower_components'));

var server = app.listen(3000, function() {
	console.log('server listening to http://localhost:3000');
});
