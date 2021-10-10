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
	contexts?: Context[];
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
	People = "People",
}

export enum WordSubType {
	Affix = "Affix",
	Suffix = "Suffix",
	Preposition = "Preposition",
}

export enum Context {
	Peoples = "Peoples",
	Work = "Work",
	Ambient = "Ambient",
	Technology = "Technology",
	Food = "Food",
}

export enum Category {
	Border = "Border",
	Object = "Object",
	Wallpaper = "Wallpaper",
	Decoration = "Decoration",
}
