// Types
export type Layout = {
	value: string;
	types: WordType[];
	subtypes?: WordSubType[];
	properties?: WordProperties[];
};

export type Title = {
	layout: Layout;
	words: TitleWord[];
	value?: string;
};

export type Word = {
	type: WordType;
	subType?: WordSubType;
	value: string;
	pluralValue?: string;
	randomFrom?: string[];
	article: boolean;
};

export type TitleWord = {
	word: Word;
	properties?: WordProperties;
};

export type WordProperties = {
	article?: boolean;
	plural?: boolean;
};

export enum WordType {
	Noun = "Noun",
	Verb = "Verb",
	Adjective = "Adjective",
	FromArray = "FromArray",
}

export enum WordSubType {
	Affix = "Affix",
	Suffix = "Suffix",
	Preposition = "Preposition",
}