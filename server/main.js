import {shiftVowels, splitWords, parseConsonantsVowels, toAscii, base64Encoding} from './wordManipulation.js';
import request from 'request';

export class StringManipulator {

	getWordsAndFiboNumber(guid, cb) {
		request({
			uri: 'http://internal-comfybuffalo-1-dev.apphb.com/values/' + guid,
			method: 'GET',
		}, function(error, response, body) {
			cb(JSON.parse(body));
		});
	}

	executeMain(words, fibo) {
		let resultMessage = '';
		let englishWords = splitWords(words);
		englishWords.sort((a, b) => {
			if (a.toLowerCase() < b.toLowerCase()) return -1;
			if (a.toLowerCase() > b.toLowerCase()) return 1;
			return 0;
		});
		let shiftedVowels = shiftVowels(englishWords);
		let consonantsVowelsEncoded = parseConsonantsVowels(shiftedVowels, fibo);
		consonantsVowelsEncoded.sort((a, b) => {
			if (a.toLowerCase() > b.toLowerCase()) return -1;
			if (a.toLowerCase() < b.toLowerCase()) return 1;
			return 0;
		});
		let asciString = toAscii(consonantsVowelsEncoded);
		resultMessage = base64Encoding(asciString);
		return resultMessage;
	}

	postValues(message, guid) {
		request.post({
			url: 'http://internal-comfybuffalo-1-dev.apphb.com/values/' + guid,
			form: {
				encodedValue: message,
				emailAddress: 'osman.sist@gmail.com',
				name: 'Osman',
				webhookUrl: 'https://github.com/justrdk',
				repoUrl: 'https://github.com/justrdk/yummy-turtle'
			}
		}, function(err, httpResponse, body) {
			console.log('body', body);
		});
	}
}
