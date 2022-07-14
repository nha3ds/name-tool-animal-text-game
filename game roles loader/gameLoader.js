var gameValidator = require('./gameValidator');
function cleanGameList(gameList,necessaryGameRules,necessaryRoundRules) {
    cleanGames = [];
    for (let index = 0; index < gameList.length; index++) {
        var  game = gameList[index];
        var result = gameValidator.validateGameRules(necessaryGameRules,necessaryRoundRules,game);
        if(result == 1)
        {
            cleanGames.push(game);
        }
    }
    return cleanGames;    
}

function getGamesInanguage(cleanGames,necessaryGameRules,language) {
    var gamesInLanguage = [];
    for (let index = 0; index < cleanGames.length; index++) {
        var  game = cleanGames[index];
        var result = gameValidator.validateAllGameMessagesLanguage(necessaryGameRules,game,language);
        if(result == 1)
        {
            gamesInLanguage.push(game);
        }
    }
    return gamesInLanguage;    
}
exports.cleanGameList = cleanGameList;
exports.getGamesInanguage = getGamesInanguage;