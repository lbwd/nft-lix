// Types
export type Layout = {
	value: string;
	types: WordType[];
};

export type Title = {
	layout: Layout;
	words: TitleWord[];
	value?: string;
};

export type Word = {
	type: WordType;
	subType?: string;
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
	Noun,
	Verb,
	Adjective,
	FromArray,
}
