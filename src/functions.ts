import * as fs from "fs";
import {
	Layout,
	Title,
	TitleWord,
	Word,
	WordProperties,
	WordSubType,
	WordType,
} from "./types";

// Functions
export function main(): Title[] {
	const RANDOM_RUN = 10;
	const RARITY_SECOND_DIRECTOR = 0.05;
	const RARITY_SECOND_CAST = 0.8;
	const RARITY_THIRD_CAST = 0.6;
	const RARITY_FORTH_CAST = 0.4;
	const RARITY_FIFTH_CAST = 0.2;

	// Read layouts file
	let layouts: Layout[] = JSON.parse(
		fs.readFileSync("./assets/data/layouts.json").toString()
	);

	// Read words file
	let readWords: Word[] = JSON.parse(
		fs.readFileSync("./assets/data/words.json").toString()
	);

	let peoples: Word[] = JSON.parse(
		fs.readFileSync("./assets/data/peoples.json").toString()
	);

	let prizes: Word[] = JSON.parse(
		fs.readFileSync("./assets/data/prizes.json").toString()
	);

	// Build words arrays
	// words: Word[][]
	let words: any = [];
	Object.keys(WordType).forEach((type) => {
		words[type] = readWords.filter((word) => word.type === type);
	});

	// Random layout
	let retVals: Title[] = [];
	for (let i = 0; i < RANDOM_RUN; i++) {
		let layout = layouts[Math.floor(Math.random() * layouts.length)];

		let title: Title = {
			layout: layout,
			words: [],
		};

		// Words
		layout.types.forEach((type) => {
			let ofTypeWords: Word[] = words[type];
			let randomedWord: Word;

			if (layout.subtypes) {
				let subType: WordSubType = layout.subtypes[layout.types.indexOf(type)];
				let ofSubTypeWords: Word[] = ofTypeWords.filter(
					(word) => word.subType === subType
				);

				randomedWord =
					ofSubTypeWords[Math.floor(Math.random() * ofTypeWords.length)];
			} else {
				randomedWord =
					ofTypeWords[Math.floor(Math.random() * ofTypeWords.length)];
			}

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

		// Cast and prizes
		// Director
		let director: Word = peoples[Math.floor(Math.random() * peoples.length)];
		title.directedBy = "Directed by " + director.value;
		if (Math.random() <= RARITY_SECOND_DIRECTOR) {
			// FIXME possible duplicates
			let secondDirector = peoples[Math.floor(Math.random() * peoples.length)];
			title.directedBy += " and " + secondDirector.value;
		}

		// Cast
		let cast: Word[] = [];
		let castFirst: Word = peoples[Math.floor(Math.random() * peoples.length)];
		cast.push(castFirst);
		if (Math.random() <= RARITY_SECOND_CAST) {
			let castFirst: Word = peoples[Math.floor(Math.random() * peoples.length)];
			cast.push(castFirst);
			if (Math.random() <= RARITY_THIRD_CAST) {
				let castFirst: Word =
					peoples[Math.floor(Math.random() * peoples.length)];
				cast.push(castFirst);
				if (Math.random() <= RARITY_FORTH_CAST) {
					let castFirst: Word =
						peoples[Math.floor(Math.random() * peoples.length)];
					cast.push(castFirst);
					if (Math.random() <= RARITY_FIFTH_CAST) {
						let castFirst: Word =
							peoples[Math.floor(Math.random() * peoples.length)];
						cast.push(castFirst);
					}
				}
			}
		}
		title.cast = [];
		cast.forEach((c) => title.cast?.push(c.value));

		retVals.push(compileTitle(title));
	}

	return retVals;
}

function compileTitle(title: Title) {
	title.value = title.layout.value;
	let re = new RegExp("{(.)}", "g");
	title.value = title.value.replace(re, (match) => {
		let index = match.substring(1, 2);
		let retVal = "";
		let titleWord = title.words[parseInt(index)];

		// Properties
		// Article
		let layoutProps = title.layout.properties;
		if (
			layoutProps &&
			layoutProps[parseInt(index)] &&
			layoutProps[parseInt(index)].article !== undefined
		) {
			if (layoutProps[parseInt(index)].article && titleWord.word.article) {
				retVal = "the ";
			}
		} else if (titleWord.properties?.article && titleWord.word.article) {
			retVal = "the ";
		}

		// Plural
		if (
			layoutProps &&
			layoutProps[parseInt(index)] &&
			layoutProps[parseInt(index)].plural !== undefined
		) {
			if (layoutProps[parseInt(index)].plural && titleWord.word.pluralValue) {
				return retVal + titleWord.word.pluralValue;
			}
		} else if (titleWord.properties?.plural && titleWord.word.pluralValue) {
			return retVal + titleWord.word.pluralValue;
		}

		// FromArray compile
		if (
			titleWord.word.type === WordType.FromArray &&
			titleWord.word.randomFrom
		) {
			titleWord.word.value =
				titleWord.word.randomFrom[
					Math.floor(Math.random() * titleWord.word.randomFrom.length)
				];
		}

		return retVal + titleWord.word.value;
	});

	title.value = title.value.charAt(0).toUpperCase() + title.value.slice(1);
	return title;
}
