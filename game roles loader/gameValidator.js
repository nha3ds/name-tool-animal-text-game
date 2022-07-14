
function validateGameRules(gameDefinition, entryDefinition, game) {
    for (var i = 0; i < gameDefinition.length; i++) {
        var entry = game[gameDefinition[i]];
        if (entry == null || entry == "")
            return -1

        if (gameDefinition[i] == 'start' || gameDefinition[i] == 'end') {
            if (validateRule(entryDefinition, entry) == -1)
                return -1
            //return entry
        }
        if (gameDefinition[i] == 'flow') {
            for (let index = 0; index < entry.length; index++) {
                if (validateRule(entryDefinition, entry[index]) == -1)
                    return -1;
            }
        }
    }
    return 1;
}
function validateRule(definition, rule) {
    for (var i = 0; i < definition.length; i++) {
        var entry = rule[definition[i]];
        if (entry == null || entry == "")
            return -1
    }
    return 1
}

function validateLanguageMessages(definition, language) {
    for (var i = 0; i < definition.length; i++) {
        var entry = language[definition[i]];
        if (entry == null || entry == "")
            return -1
    }
    return 1
}

function validateAllGameMessagesLanguage(gameDefinition, gameRule, language) {
    if (gameDefinition.indexOf("start") > -1) {
        var entry = gameRule.start;
        var result = validateLanguageMessages(entry.messages, language);
        if (result == -1)
            return - 1;
    }


    if (gameDefinition.indexOf("end") > -1) {
        var entry = gameRule.end;
        var result = validateLanguageMessages(entry.messages, language);
        if (result == -1)
            return - 1;

    }

    if (gameDefinition.indexOf("flow") > -1) {
        var flow = gameRule.flow;
        for (let index = 0; index < flow.length; index++) {
            var entry = flow[index];
            var result = validateLanguageMessages(entry.messages, language);
            if (result == -1)
                return - 1;
        }

    }
    return 1
}

exports.validateGameRules = validateGameRules;
exports.validateRule = validateRule;//for testing
exports.validateLanguageMessages = validateLanguageMessages;//for testing
exports.validateAllGameMessagesLanguage = validateAllGameMessagesLanguage;