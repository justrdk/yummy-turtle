const englishWords = ["cats", "rule", "dogs", "drool", "clean", "code", "materials", "needed", "this", "is", "hard",
	"what", "are", "you", "smoking", "shot", "gun", "down", "river", "super", "man"
];

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
					temp.splice(rightIndex, 0, temp.splice(i, 1)[0]);
				}
			}
		}

		words[k] = temp.join("");
	}

	return words;
}

export function alternateCapCaseConsonants(words) {
	let allWords = words.join("$");
	let firstCap = allWords[0] === allWords[0].toUpperCase();

	for (let i in allWords) {
		let currentChar = allWords[i];

		if (currentChar.toLowerCase() !== 'a' && currentChar.toLowerCase() !== 'e' && currentChar.toLowerCase() !== 'i' &&
			currentChar.toLowerCase() !== 'o' && currentChar.toLowerCase() !== 'u' && currentChar !== '$') {

			if (firstCap) {
				allWords = allWords.substr(0, i) + currentChar.toUpperCase() + allWords.substr(parseInt(i, 10) + 1);
			} else {
				allWords = allWords.substr(0, i) + currentChar.toLowerCase() + allWords.substr(parseInt(i, 10) + 1);
			}

			firstCap = !firstCap;
		}
	}

	return allWords.split('$');
}


function fibonacciIndex(fib) {
	fib = BigInteger(fib);
	var x = fib.multiply(Math.sqrt(5)).add((1 / 2));

	return Math.round(x.log() / Math.log(phi()));
}

function phi() {
	return (1 + Math.sqrt(5)) / 2;
}
