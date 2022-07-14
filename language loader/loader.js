
function extractLanguageDefinitions(definitions) {
    var extraction = [];
    var i = definitions.indexOf(",");
    while (i > -1) {
        var value = definitions.substr(0, i)
        definitions = definitions.substr(i + 1)
        i = definitions.indexOf(",");
        extraction.push(value);
    }
    extraction.push(definitions);
    return extraction;
}

function validateLanguage(definition, language) {
    for (var i = 0; i < definition.length; i++) {
        var entry = language[definition[i]];
        if (entry == null || entry == "")
            return -1
        //console.log(file+" is missing \""+languageDefinitions[i]+"\" skipping...");
    }
    return 1
}
exports.extractLanguageDefinitions = extractLanguageDefinitions;
exports.validateLanguage = validateLanguage;