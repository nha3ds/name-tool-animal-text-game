var assert = require('assert');
var operationsMaker = require('../game control/gameFlowOperations');
var operations;
var players;
var allReadyIsCalled;
function allReady()
{
    allReadyIsCalled = true;
}
describe('gameFlowOberations tests', function() {
    beforeEach(function(){
        allReadyIsCalled = false;
        players = [{},{}];
        players[0].ready = false; 
        players[1].ready = false; 

        operations = new operationsMaker(players,allReady);
    })
    
	describe('constructor tests', function() {
		it('validation test');
	});
	describe('ready tests', function() {
		it('calls allReady when all players are ready', function(done) {
            operations.ready(players[0]);
            operations.ready(players[1]);
            assert.equal(allReadyIsCalled,true)
            done();
        });

        it('doesn\'t calls allReady when not all players are ready', function(done) {
            operations.ready(players[1]);
            assert.equal(allReadyIsCalled,false)
            done();
        });

        it('doesn\'t calls allReady when a player unreadys', function(done) {
            operations.ready(players[0]);
            operations.unReady(players[0]);
            operations.ready(players[1]);
            assert.equal(allReadyIsCalled,false)
            done();
        });

        it('calls allReady when the only unReady player leaves', function(done) {
            operations.ready(players[0]);
            operations.remove(players[1]);
            assert.equal(allReadyIsCalled,true)
            done();
        });
	});
});