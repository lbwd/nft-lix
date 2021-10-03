import { Layout, Title, TitleWord, Word, WordType } from "./types";
import * as fs from "fs";

// Test objs
let testWord: Word = {
	type: WordType.Noun,
	subType: "",
	value: "employer",
	pluralValue: "employers",
	article: true,
};

let testTitleWord: TitleWord = {
	word: testWord,
	properties: { plural: true },
};

let testWord2: Word = {
	type: WordType.Noun,
	subType: "",
	value: "wave",
	pluralValue: "waves",
	article: true,
};

let testTitleWord2: TitleWord = {
	word: testWord2,
	properties: { article: true, plural: true },
};

let testLayout: Layout = {
	value: "{0} from {1}",
	types: [WordType.Noun, WordType.Noun],
};

let testTitle: Title = {
	layout: testLayout,
	words: [testTitleWord, testTitleWord2],
};

// Main
let layouts: Layout[] = JSON.parse(
	fs.readFileSync("./data/layouts.json").toString()
);

let words: Word[] = JSON.parse(fs.readFileSync("./data/words.json").toString());

console.log(compileTitle(testTitle).value);
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
