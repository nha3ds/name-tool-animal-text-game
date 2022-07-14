var assert = require('assert');
var collection = require('../game control/rulesCollection');
var interpreter = require('../game control/rulesInterpreter');;

describe('rulesInterpreter tests', function () {
	it('returns correct functions from rulesCollections', function (done) {
		var start = collection.startGameSimple;
		var round = collection.playRoundSimple;
		var score = collection.showScore;
		var end = collection.endGameSimple;
		var rulesObject = { "start": start, "end": end, "score": score, "round": round };
		var nameList = ["start", "end", "score", "round"];
		var result = interpreter.getRulesObject(nameList);
		assert.deepEqual(rulesObject, result);
		done();
	});

	it('returns return -1 if a rule can\' be found', function (done) {
		var nameList = ["start", "end", "aszxcfw", "score"];
		var result = interpreter.getRulesObject(nameList);
		assert.equal(-1, result);
		done();
	});

	describe('rulesInterpreter returns correct functions from collection', function () {
		it('returns start', function (done) {
			var rulesObject = { "start": collection.startGameSimple };
			var result = interpreter.getRulesObject(["start"]);
			assert.deepEqual(rulesObject, result);
			done();
		});

		it('returns score', function (done) {
			var rulesObject = { "score": collection.showScore };
			var result = interpreter.getRulesObject(["score"]);
			assert.deepEqual(rulesObject, result);
			done();
		});

		it('returns vote', function (done) {
			var rulesObject = { "vote": collection.voteOtherPlayers };
			var result = interpreter.getRulesObject(["vote"]);
			assert.deepEqual(rulesObject, result);
			done();
		});

		it('returns round', function (done) {
			var rulesObject = { "round": collection.playRoundSimple };
			var result = interpreter.getRulesObject(["round"]);
			assert.deepEqual(rulesObject, result);
			done();
		});

		it('returns end', function (done) {
			var rulesObject = { "end": collection.endGameSimple };
			var result = interpreter.getRulesObject(["end"]);
			assert.deepEqual(rulesObject, result);
			done();
		});
	});
});