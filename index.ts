// Types
type titleLayout = {
	layout: string;
	words: titleWord[];
	value?: string;
};

type word = {
	type: wordType;
	subType?: string;
	value: string;
	randomFrom?: string[];
	article: boolean;
};

type titleWord = {
	word: word;
	properties?: object[];
};

enum wordType {
	Noun,
	Verb,
	Adjective,
	FromArray,
}

// Test objs
let testWord: word = {
	type: wordType.Noun,
	subType: "",
	value: "Employer",
	article: true,
};

let testLayout: titleLayout = {
	layout: "{0}",
	words: [{ word: testWord }],
};

// Functions
function compileTitle(title: titleLayout) {
	title.value = title.layout;
	let re = new RegExp("{(.)}", "i");
	title.value = title.value.replace(re, (match) => {
		let index = match.substring(1, 2);
		return title.words[parseInt(index)].word.value;
	});

	return title;
}

// Main
console.log(compileTitle(testLayout).value);
