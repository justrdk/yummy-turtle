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

export function shiftVowels(words) {
	let word = '';
	let wordArray = [];
	let tempWord = '';

	for (let k in words) {
		tempWord = words[k];
		wordArray = words[k].split('');

		for (var i = 0; i < tempWord.length; i++) {
			let currentChar = tempWord[i];

			if (isVowel(currentChar)) {

				if (i === (wordArray.length - 1)) {
					wordArray.splice(0, 0, wordArray.splice(i, 1)[0]);
				} else {
					let rightIndex = i + 1;
					wordArray.splice(rightIndex, 0, wordArray.splice(i, 1)[0]);
					i++;
				}
			}
		}

		words[k] = wordArray.join("");
	}

	return words;
}

export function parseConsonantsVowels(words, fibo) {
	let wordArray = [];
	let firstCap = words[0][0] === words[0][0].toUpperCase();
	let fiboIndex = fibonacciIndex(fibo);

	for (let i in words) {
		wordArray = words[i].split('');

		for (let k in wordArray) {
			let currentChar = wordArray[k];

			if (!isVowel(currentChar)) {

				if (firstCap) {
					wordArray[k] = currentChar.toUpperCase();
				} else {
					wordArray[k] = currentChar.toLowerCase();
				}

				firstCap = !firstCap;

			} else if (isVowel(currentChar)) {
				wordArray[k] = fibonacci(fiboIndex);
				fiboIndex++;
			}
		}

		words[i] = wordArray.join("");

	}

	return words;
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

let isVowel = (character) => {
	let vowels = ['a', 'e', 'i', 'o', 'u'];
	return vowels.includes(character.toLowerCase());
};

let fibonacci = (n) => {
	let a = 0;
	let b = 1;
	let f = 1;

	for (let i = 2; i <= n; i++) {
		f = a + b;
		a = b;
		b = f;
	}
	return f;
};

let fibonacciIndex = (fib) => {
	fib = BigInteger(fib);
	var x = fib.multiply(Math.sqrt(5)).add((1 / 2));
	return Math.round(Math.log(x) / Math.log(phi()));
};

let phi = () => {
	return (1 + Math.sqrt(5)) / 2;
};
