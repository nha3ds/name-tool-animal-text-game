var assert = require('assert');
var collection = require('../game control/rulesCollection');
var isEmited;
var message;
var messageContent
function emit(Message, MessageContent) {
	isEmited = true;
	message = Message;
	messageContent = MessageContent;
}
var room = {};
room.emit = emit;

describe('rulesCollection tests', function () {
	beforeEach(function () {
		isEmited = false;
		message = "";
		messageContent = "";
	});

	describe('startGameSimple tests', function () {

		it('emit is called', function (done) {
			collection.startGameSimple(room);
			assert.equal(isEmited, true);
			done();
		});

		it('emits message "startGame"', function (done) {
			collection.startGameSimple(room);
			assert.equal(message, "startGame");
			done();
		});
	});

	describe('playRoundSimple tests', function () {

		it('emit is called', function (done) {
			collection.playRoundSimple(room);
			assert.equal(isEmited, true);
			done();
		});

		it('emits message "round"', function (done) {
			collection.playRoundSimple(room, "test");
			assert.equal(message, "round");
			done();
		});

		it('emits content "test"', function (done) {
			collection.playRoundSimple(room, "test");
			assert.equal(messageContent, "test");
			done();
		});
	});

	describe('voteOtherPlayers tests', function () {

		it('emit is called', function (done) {
			collection.voteOtherPlayers(room);
			assert.equal(isEmited, true);
			done();
		});

		it('emits message "vote"', function (done) {
			collection.voteOtherPlayers(room);
			assert.equal(message, "vote");
			done();
		});
	});

	describe('showScore tests', function () {

		it('emit is called', function (done) {
			collection.showScore(room);
			assert.equal(isEmited, true);
			done();
		});

		it('emits message "score"', function (done) {
			collection.showScore(room);
			assert.equal(message, "score");
			done();
		});

		it('emits same messageContent given', function (done) {
			var player1 = { "score": 5, "answers": ["a", "b"] }
			var player2 = { "score": 15, "answers": ["z", "y"] }
			var object = [player2, player1];
			collection.showScore(room, object);
			assert.deepEqual(object, messageContent);
			done();
		});
	});

	describe('endGameSimple tests', function () {

		it('emit is called', function (done) {
			collection.endGameSimple(room);
			assert.equal(isEmited, true);
			done();
		});

		it('emits message "end"', function (done) {
			collection.endGameSimple(room);
			assert.equal(message, "end");
			done();
		});

		it('emits same messageContent given', function (done) {
			var player1 = { "score": 5, "answers": ["a", "b"] }
			var player2 = { "score": 15, "answers": ["z", "y"] }
			var object = [player2, player1];
			collection.endGameSimple(room, object);
			assert.deepEqual(object, messageContent);
			done();
		});
	});
});