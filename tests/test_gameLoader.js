var assert = require('assert');
var gameLoader = require('../game roles loader/gameLoader');
var gameList;
var game1;
var game2;
var game3;
var necessaryGameRules;
var necessaryRoundRules;
var flow1;
var flow2;
var start;
var end;
var languagesToUse;
var language = { "title": "my game", "time": "Time", "score": "points", "name": "Player:" };
describe('gameLoader tests', function () {
    beforeEach(function name() {
        necessaryRoundRules = ['id', 'messages', 'delay'];
        necessaryGameRules = ['start', 'end', 'flow', 'score', 'languages'];
        flow1 = { 'id': 'x', 'messages': ['score'], 'delay': 60000, 'endCondition': 'x' };
        flow2 = { 'id': 'y', 'messages': ['title', 'score'], 'delay': 60000, 'endCondition': 'x' };
        start = { 'id': 'start', 'messages': ["title", "name"], 'delay': 60000, 'endCondition': 'x' };
        end = { 'id': 'end', 'messages': ["score", "name"], 'delay': 60000, 'endCondition': 'x' };
        languagesToUse = ['ar', 'en'];
        game1 = {
            'flow': [flow1, flow2], 'start': start, 'minPlayer': 3, 'maxPlayers': 10, 'end': end,
            'languages': languagesToUse, 'score': 'x'
        };
        game2 = {
            'flow': [flow1, flow2,flow1,flow2], 'start': start, 'minPlayer': 3,  'end': end,
            'languages': ['ar'], 'score': 'x'
        };
        game3 = {
            'flow': [flow1, flow1,flow2], 'start': start, 'minPlayer': 3, 'minPlayers': 10, 'end': end,
            'languages': ['en'], 'score': 'x'
        };
        gameList = [game1, game2, game3];
    })
    describe('cleanGameList tests', function () {
        it('returns 3 games when 3 correct games are passed', function (done) {
            var result= gameLoader.cleanGameList(gameList,necessaryGameRules,necessaryRoundRules);
            assert.equal(3, result.length);
            done();
        });

        it('returns 2 games when 2 correct and 1 inccorect games are passed', function (done) {
            gameList[2] = {'start': start, 'minPlayer': 3, 'minPlayers': 10, 'end': end,
            'languages': ['en'], 'score': 'x'}
            var result= gameLoader.cleanGameList(gameList,necessaryGameRules,necessaryRoundRules);
            assert.equal(2, result.length);
            done();
        });
        describe('getGamesInanguage tests', function () {
            it('returns 3 games when 3 games that are can be in language are passed', function (done) {
                var result= gameLoader.getGamesInanguage(gameList,necessaryGameRules,language);
                assert.equal(3, result.length);
                done();
            });
    
            it('returns 2 games when 2 correct and inccorect games are passed', function (done) {
                gameList[0].start =  { 'id': 'start', 'messages': ["rrewr", "name"], 'delay': 60000, 'endCondition': 'x' };
                var result= gameLoader.getGamesInanguage(gameList,necessaryGameRules,language);
                assert.equal(2, result.length);
                done();
            });

        })
    });
});