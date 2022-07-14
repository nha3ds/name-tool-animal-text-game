var assert = require('assert');
var gameValidator = require('../game roles loader/gameValidator');
var entryDefinition;
var gameDefinition;
var flow1;
var flow2;
var start;
var end;
var languages;
var gameRule;
var definitions;
var languageMessages;

describe('gameValidator tests', function () {
    beforeEach(function name() {
        entryDefinition = ['id', 'messages', 'delay'];
        gameDefinition = ['start', 'end', 'flow', 'score', 'languages'];
        flow1 = { 'id': 'x', 'messages': ['score'], 'delay': 60000, 'endCondition': 'x' };
        flow2 = { 'id': 'y', 'messages': ['title','score'], 'delay': 60000, 'endCondition': 'x' };
        start = { 'id': 'start', 'messages': ["title", "name"], 'delay': 60000, 'endCondition': 'x' };
        end = { 'id': 'end', 'messages': ["score", "name"], 'delay': 60000, 'endCondition': 'x' };
        languages = ['ar', 'en'];
        gameRule = {
            'flow': [flow1, flow2], 'start': start, 'minPlayer': 3, 'maxPlayers': 10, 'end': end,
            'languages': languages, 'score': 'x'
        };
        definitions = ["title", "score", "name"];
        languageMessages = { "title": "my game", "time": "Time", "score": "points", "name": "Player:" };
    })

    describe('ValidateGameRules tests', function () {
        it('returns 1 if all definitions entries are in the game rule', function (done) {
            var result = gameValidator.validateGameRules(gameDefinition, entryDefinition, gameRule);
            assert.equal(1, result);
            done();
        });

        it('returns -1 if a definition is missing in the game rule', function (done) {
            gameRule = {
                'flow': [flow1, flow2], 'starttt': start, 'minPlayer': 3, 'maxPlayers': 10, 'end': end,
                'languages': languages, 'score': 'x'
            };
            var result = gameValidator.validateGameRules(gameDefinition, entryDefinition, gameRule);
            assert.equal(-1, result);
            done();
        });

        it('returns -1 if a definition is missing in the start rule', function (done) {
            gameRule.start = { 'idf': 'start', 'messages': ['score'], 'delay': 60000, 'endCondition': 'x' };
            var result = gameValidator.validateGameRules(gameDefinition, entryDefinition, gameRule);
            assert.equal(-1, result);
            done();
        });

        it('returns -1 if a definition is missing in the end rule', function (done) {
            gameRule.end = { 'ida': 'end', 'messages': ['end'], 'delay': 60000, 'endCondition': 'x' };
            var result = gameValidator.validateGameRules(gameDefinition, entryDefinition, gameRule);
            assert.equal(-1, result);
            done();
        });

        it('returns -1 if a definition is missing in the one of the flow rule', function (done) {
            gameRule.flow[1] = { 'id': 'x', 'messages': ['start'], 'a': 60000, 'endCondition': 'x' };
            var result = gameValidator.validateGameRules(gameDefinition, entryDefinition, gameRule);
            assert.equal(-1, result);
            done();
        });
    })

    describe('validateRule tests', function () {
        it('returns 1 if rule definitions are correct', function (done) {
            var result = gameValidator.validateRule(entryDefinition, flow1);
            assert.equal(1, result);
            done();
        });

        it('returns -1 if missing something', function (done) {
            flow1 = { 'idss': 'x', 'messages': ['x'], 'delay': 60000, 'endCondition': 'x' };
            var result = gameValidator.validateRule(entryDefinition, flow1);
            assert.equal(-1, result);
            done();
        });
    })

    describe('validateLanguageMessages tests', function () {
        it('returns 1 if all definitions messages are in language', function (done) {
           
            var result = gameValidator.validateLanguageMessages(definitions, languageMessages);
            assert.equal(1, result);
            done();
        });

        it('returns -1 if a definition is empty', function (done) {
            var languageMessages = { "title": "", "score": "points", "name": "Player:" };
            var result = gameValidator.validateLanguageMessages(definitions, languageMessages);
            assert.equal(-1, result);
            done();
        });

        it('returns -1 if missing a message', function (done) {
            var languageMessages = { "tle": "my game", "score": "points", "name": "Player:" };
            var result = gameValidator.validateLanguageMessages(definitions, languageMessages);
            assert.equal(-1, result);
            done();
        });
    })


    describe('validateAllGameMessagesLanguage tests', function () {
        it('returns 1 if all definitions messages are in language', function (done) {
            var result = gameValidator.validateAllGameMessagesLanguage(gameDefinition, gameRule, languageMessages);
            assert.equal(1, result);
            done();
        });

        it('returns -1 if a message dosen\'t exist in start', function (done) {
            gameRule.start.messages = ["asd", "name"];
            var result = gameValidator.validateAllGameMessagesLanguage(gameDefinition, gameRule, languageMessages);
            assert.equal(-1, result);
            done();
        });

        it('returns 1 if gameDefinition dosen\'t have start', function (done) {
            gameDefinition = ['flow','end'];
            var result = gameValidator.validateAllGameMessagesLanguage(gameDefinition, gameRule, languageMessages);
            assert.equal(1, result);
            done();
        });

        it('returns -1 if a message dosen\'t exist in end', function (done) {
            gameRule.end.messages = ["sasdtitrwee", "name"];
            var result = gameValidator.validateAllGameMessagesLanguage(gameDefinition, gameRule, languageMessages);
            assert.equal(-1, result);
            done();
        });

        it('returns 1 if gameDefinition dosen\'t have end', function (done) {
            gameDefinition = ['flow','start'];
            var result = gameValidator.validateAllGameMessagesLanguage(gameDefinition, gameRule, languageMessages);
            assert.equal(1, result);
            done();
        });

        it('returns -1 if a message dosen\'t exist in one flow', function (done) {
            gameRule.flow[0].messages = ["asdgfw", "name"];
            var result = gameValidator.validateAllGameMessagesLanguage(gameDefinition, gameRule, languageMessages);
            assert.equal(-1, result);
            done();
        });

        it('returns 1 if gameDefinition dosen\'t have end', function (done) {
            gameDefinition = ['end','start'];
            var result = gameValidator.validateAllGameMessagesLanguage(gameDefinition, gameRule, languageMessages);
            assert.equal(1, result);
            done();
        });
    })

    // describe('validateRuleEntryId tests', function () {
    //     it('returns 1', function (done) {
    //         assert.equal(1, 1);
    //         done();
    //     });
    // })
});