var assert = require('assert');
var Controller = require('../game control/rulesFlowController');
var controller = new Controller();
var controller2 = new Controller();
var isCalled = false;
var isCalled2 = false;
var calls = 0;
function emitEventMock() {
	isCalled = true;
	calls++;
}
function emitEventMock2() {
	isCalled2 = true;
	calls++;
}
describe('rulesFlowController tests', function () {
	beforeEach(function () {
		isCalled = false;
		isCalled2 = false;
		calls = 0;
	});
	describe('more than one objects don\'t interfer', function () {
		it('2 different objects have 2 different function calls',  function (done)  {
			controller.callRule(emitEventMock, 20);
			controller2.callRule(emitEventMock, 30);
			setTimeout(function () {
				assert.equal(calls, 2);
				done();
			}, 100)
		});

		it('2 different objects have 2 different functions will not replace each other',  function (done)  {
			controller.callRule(emitEventMock, 20);
			controller2.callRule(emitEventMock2, 30);
			setTimeout(function () {
				assert.equal(true, isCalled);
				assert.equal(true, isCalled2);
				done();
			}, 100)
		});
	})
	

	describe('Delay tests', function () {
		
		it('that function is called by the time given',  function (done)  {
			controller.callRule(emitEventMock, 200);
			setTimeout(function () {
				assert.equal(isCalled, true);
				done();
			}, 205)
		});

		it('that function isn\'t called before the time given', function (done) {
			controller.callRule(emitEventMock, 200);
			setTimeout(function () {
				assert.equal(isCalled, false);
				done();
			}, 190)

		});
		
	});

	describe('Interrupts tests', function () {
		  
		 it('that the first function isn\'t called when another one is passed',  function (done) {
			controller.callRule(emitEventMock, 100);
			controller.callRule(emitEventMock2, 200);
			setTimeout(function () {
				assert.equal(isCalled, false);
				done();
			}, 205)
		});	

		it('that the second function is called when passing 2 functions',  function (done) {
			controller.callRule(emitEventMock, 100);
			controller.callRule(emitEventMock2, 200);
			setTimeout(function () {
				assert.equal(isCalled2, true);
				done();
			}, 205)
		});
		
		it('correct number of functions is called',  function (done) {
			controller.callRule(emitEventMock, 100);
			controller.callRule(emitEventMock2, 1);
			setTimeout(function () {
				controller.callRule(emitEventMock2, 20);
			}, 40)
			setTimeout(function () {
				controller.callRule(emitEventMock, 20);
			}, 10)
			setTimeout(function () {
				controller.callRule(emitEventMock2, 40);
			}, 110)
			setTimeout(function () {
				assert.equal(calls, 4);
				done();
			}, 205)
		});	
	});
});