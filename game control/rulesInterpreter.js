var collection = require('./rulesCollection');

function getRulesObject(rules) {
    var object = {};
    for (let index = 0; index < rules.length; index++) {
        switch (rules[index]) {
            case "start":
                object.start = collection.startGameSimple;
                break;
            case "score":
                object.score = collection.showScore;
                break;
            case "round":
                object.round = collection.playRoundSimple;
                break;
            case "vote":
                object.vote = collection.voteOtherPlayers;
                break;
            case "end":
                object.end = collection.endGameSimple;
                break;
            default:
                return -1;
        }
    }

    return object;
}
exports.getRulesObject = getRulesObject;