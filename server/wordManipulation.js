const englishWords = ["cats", "rule", "dogs", "drool", "clean", "code", "materials", "needed", "this", "is", "hard",
	"what", "are", "you", "smoking", "shot", "gun", "down", "river", "super", "man"
];
import BigInteger from 'big-integer';


function isEnglishWord(word) {
	return englishWords.includes(word.toLowerCase());
}

export function splitWords(words) {
	let newWords = [];
	for (let i in words) {
		let word = words[i];
		if (isEnglishWord(word)) {
			newWords.push(word);
		} else {
			let temp = '';
			for (let j in word) {
				temp += word[j];

				if (isEnglishWord(temp) || j == (word.length - 1)) {
					newWords.push(temp);
					temp = '';
				}
			}
		}
	}

	return newWords;
}

export function sortAlphabetically(words) {
	return words.sort();
}

export function shiftVowels(words) {
	let word = '';
	let temp = [];
	let newWord = '';

	for (let k in words) {
		word = words[k];
		temp = word.split('');

		for (let i in word) {
			let currentChar = word[i];

			if (currentChar.toLowerCase() === 'a' || currentChar.toLowerCase() === 'e' || currentChar.toLowerCase() === 'i' ||
				currentChar.toLowerCase() === 'o' || currentChar.toLowerCase() === 'u') {

				if (i == (word.length - 1)) {
					temp.splice(0, 0, temp.splice(i, 1)[0]);
				} else {
					let rightIndex = parseInt(i, 10) + 1;
					if (word[rightIndex].toLowerCase() !== currentChar.toLowerCase()) {
						temp.splice(rightIndex, 0, temp.splice(i, 1)[0]);
					}
				}
			}
		}

		words[k] = temp.join("");
	}

	return words;
}

export function parseConsonantsVowels(words, fibo) {
	let temp = [];
	let firstCap = words[0][0] === words[0][0].toUpperCase();
	let fiboIndex = fibonacciIndex(fibo);

	for (let i in words) {
		temp = words[i].split('');

		for (let k in temp) {
			let currentChar = temp[k];

			if (currentChar.toLowerCase() !== 'a' && currentChar.toLowerCase() !== 'e' && currentChar.toLowerCase() !== 'i' &&
				currentChar.toLowerCase() !== 'o' && currentChar.toLowerCase() !== 'u') {

				if (firstCap) {
					temp[k] = currentChar.toUpperCase();
				} else {
					temp[k] = currentChar.toLowerCase();
				}

				firstCap = !firstCap;

			} else if (currentChar.toLowerCase() === 'a' || currentChar.toLowerCase() === 'e' || currentChar.toLowerCase() === 'i' ||
				currentChar.toLowerCase() === 'o' || currentChar.toLowerCase() === 'u') {

				temp[k] = fibonacci(fiboIndex);
				fiboIndex++;
			}
		}

		words[i] = temp.join("");

	}

	return words;
}

export function reverseAlphabeticalOrder(words) {
	return words.reverse();
}

export function toAscii(words) {

	for (let i in words) {
		if (parseInt(i, 10) === 0) {
			let asciiFirstWord = words[words.length - 1][0].charCodeAt(0);
			words[i] += asciiFirstWord;
		} else {
			let ascii = words[parseInt(i, 10) - 1][0].charCodeAt(0);
			words[i] += ascii;
		}
	}

	return words.join("");
}

export function base64Encoding(word) {
	return new Buffer(word).toString('base64');
}

function fibonacci(n) {
	let a = 0;
	let b = 1;
	let f = 1;

	for (let i = 2; i <= n; i++) {
		f = a + b;
		a = b;
		b = f;
	}
	return f;
}

function fibonacciIndex(fib) {
	fib = BigInteger(fib);
	var x = fib.multiply(Math.sqrt(5)).add((1 / 2));
	return Math.round(Math.log(x) / Math.log(phi()));
}

function phi() {
	return (1 + Math.sqrt(5)) / 2;
}
