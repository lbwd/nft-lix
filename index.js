"use strict";
exports.__esModule = true;
var types_1 = require("./types");
var fs = require("fs");
// Test objs
var testWord = {
    type: types_1.WordType.Noun,
    subType: "",
    value: "employer",
    pluralValue: "employers",
    article: true
};
var testTitleWord = {
    word: testWord,
    properties: { plural: true }
};
var testWord2 = {
    type: types_1.WordType.Noun,
    subType: "",
    value: "wave",
    pluralValue: "waves",
    article: true
};
var testTitleWord2 = {
    word: testWord2,
    properties: { article: true, plural: true }
};
var testLayout = {
    value: "{0} from {1}",
    types: [types_1.WordType.Noun, types_1.WordType.Noun]
};
var testTitle = {
    layout: testLayout,
    words: [testTitleWord, testTitleWord2]
};
// Main
var layouts = JSON.parse(fs.readFileSync("./data/layouts.json").toString());
var words = JSON.parse(fs.readFileSync("./data/words.json").toString());
console.log(words);
console.log(compileTitle(testTitle).value);
// ************************************************
// Functions
function compileTitle(title) {
    title.value = title.layout.value;
    var re = new RegExp("{(.)}", "g");
    title.value = title.value.replace(re, function (match) {
        var _a, _b;
        var index = match.substring(1, 2);
        var retVal = "";
        var titleWord = title.words[parseInt(index)];
        if (((_a = titleWord.properties) === null || _a === void 0 ? void 0 : _a.article) && titleWord.word.article) {
            retVal = "the ";
        }
        if (((_b = titleWord.properties) === null || _b === void 0 ? void 0 : _b.plural) && titleWord.word.pluralValue) {
            return retVal + titleWord.word.pluralValue;
        }
        return retVal + titleWord.word.value;
    });
    title.value = title.value.charAt(0).toUpperCase() + title.value.slice(1);
    return title;
}
