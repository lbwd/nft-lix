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
	directedBy?: string;
	cast?: string[];
	prizes?: string[];
	poster?: MoviePoster;
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

export type MoviePoster = {
	images?: MoviePosterImage[];
	// Bitmap
	value: string;
};

export type MoviePosterImage = {
	image: Image;
	props?: ImageProperties;
};

export type Image = {
	url: string;
	category: Category;
	contexts: Context[];
	position?: ImagePosition;
};

export type ImageProperties = {};

export enum WordType {
	Noun = "Noun",
	Verb = "Verb",
	Adjective = "Adjective",
	FromArray = "FromArray",
	People = "People",
	Prize = "Prize",
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
	War = "War",
	Creatures = "Creatures",
}

export enum Category {
	Wallpaper = "Wallpaper",
	Object = "Object",
	Mask = "Mask",
	Border = "Border",
	Decoration = "Decoration",
}

export enum ImagePosition {
	Full = "Full",
	Bottom = "Bottom",
	Top = "Top",
	Left = "Left",
	Right = "Right",
	BottomLeft = "BottomLeft",
	BottomRight = "BottomRight",
	TopLeft = "TopLeft",
	TopRight = "TopRight",
}
