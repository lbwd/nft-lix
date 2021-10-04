import * as fs from "fs";
import { Layout, Title, TitleWord, Word, WordProperties } from "./types";

// ************************************************
// ******************  Main  **********************
// ************************************************
const RANDOM_RUN = 10;

// Read layouts file
let layouts: Layout[] = JSON.parse(
	fs.readFileSync("./data/layouts.json").toString()
);

// Read words file
let words: Word[] = JSON.parse(fs.readFileSync("./data/words.json").toString());

// Random layout
for (let i = 0; i < RANDOM_RUN; i++) {
	let layout = layouts[Math.floor(Math.random() * layouts.length)];

	let title: Title = {
		layout: layout,
		words: [],
	};
	layout.types.forEach((type) => {
		let ofTypeWords: Word[] = words.filter((word) => word.type === type);
		let randomedWord: Word =
			ofTypeWords[Math.floor(Math.random() * ofTypeWords.length)];
		let wordProperties: WordProperties = {
			article: Math.random() < 0.5,
			plural: Math.random() < 0.5,
		};

		let titleWord: TitleWord = {
			word: randomedWord,
			properties: wordProperties,
		};

		title.words.push(titleWord);
	});

	console.log(compileTitle(title).value);
}
// ************************************************
// ************************************************
// ************************************************

// Functions
function compileTitle(title: Title) {
	title.value = title.layout.value;
	let re = new RegExp("{(.)}", "g");
	title.value = title.value.replace(re, (match) => {
		let index = match.substring(1, 2);
		let retVal = "";
		let titleWord = title.words[parseInt(index)];
		if (titleWord.properties?.article && titleWord.word.article) {
			retVal = "the ";
		}
		if (titleWord.properties?.plural && titleWord.word.pluralValue) {
			return retVal + titleWord.word.pluralValue;
		}
		return retVal + titleWord.word.value;
	});

	title.value = title.value.charAt(0).toUpperCase() + title.value.slice(1);
	return title;
}
