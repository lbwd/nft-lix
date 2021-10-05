"use strict";
exports.__esModule = true;
var fs = require("fs");
// ************************************************
// ********************  Main  ********************
// ************************************************
var RANDOM_RUN = 10;
// Read layouts file
var layouts = JSON.parse(fs.readFileSync("./data/layouts.json").toString());
// Read words file
var words = JSON.parse(fs.readFileSync("./data/words.json").toString());
var _loop_1 = function (i) {
    var layout = layouts[Math.floor(Math.random() * layouts.length)];
    var title = {
        layout: layout,
        words: []
    };
    layout.types.forEach(function (type) {
        var ofTypeWords = words.filter(function (word) { return word.type === type; });
        var randomedWord = ofTypeWords[Math.floor(Math.random() * ofTypeWords.length)];
        var wordProperties = {
            article: Math.random() < 0.5,
            plural: Math.random() < 0.5
        };
        var titleWord = {
            word: randomedWord,
            properties: wordProperties
        };
        title.words.push(titleWord);
    });
    console.log(compileTitle(title).value);
};
// Random layout
for (var i = 0; i < RANDOM_RUN; i++) {
    _loop_1(i);
}
// ************************************************
// ************************************************
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
