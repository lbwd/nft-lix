var wordType;
(function (wordType) {
    wordType[wordType["Noun"] = 0] = "Noun";
    wordType[wordType["Verb"] = 1] = "Verb";
    wordType[wordType["Adjective"] = 2] = "Adjective";
    wordType[wordType["FromArray"] = 3] = "FromArray";
})(wordType || (wordType = {}));
// Test objs
var testWord = {
    type: wordType.Noun,
    subType: "",
    value: "Employer",
    article: true
};
var testLayout = {
    layout: "{0}",
    words: [{ word: testWord }]
};
// Functions
function compileTitle(title) {
    title.value = title.layout;
    var re = new RegExp("{(.)}", "i");
    title.value = title.value.replace(re, function (match) {
        var index = match.substring(1, 2);
        console.log(index);
        return title.words[parseInt(index)].word.value;
    });
    return title;
}
// Main
console.log(compileTitle(testLayout).value);
