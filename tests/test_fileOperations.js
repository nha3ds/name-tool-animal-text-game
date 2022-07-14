var assert = require('assert');
var fileOperations = require('../fileOperations');

describe('File Operations Tests', function() {
    describe('File read tests', function() {
	    it('reads file correctly', function(done) {
            var file = fileOperations.readFile('./tests/test_file.txt');
            assert.notEqual(file,-1);
            done();
         });
        
        it('returns -1 when file doesn\'t exist', function(done) {
            var file = fileOperations.readFile('./tests/test_asdrw.txt');
            assert.equal(file,-1);
            done();
        });
    })

    describe('Synchronous read dirctory tests', function() {
        it('reads dirctory doesn\'t return -1',  function(done) {
            var dir = "./tests/";
            var result =  fileOperations.readDirectory(dir);
            assert.notEqual(result,-1);
            done();
        });

        it('reads dirctory doesn\'t return null',  function(done) {
            var dir = "./tests/";
            var result =  fileOperations.readDirectory(dir);
            assert.notEqual(result,null);
            done(); 
        });
        
        it('returns -1 if dirctory doesn\'t exsit', function(done) {
            var dir = ".tests/fasd/";
            var result = fileOperations.readDirectory(dir);
            assert.equal(result, -1);
            done();
        }); 
    })

    describe('Asynchronous read dirctory tests', function() {
        
        it('reads dirctory doesn\'t return -1',  async ()=> {
            var dir = "./tests/";
            var result = await fileOperations.asyncReadDirectory(dir);
            assert.notEqual(result,-1);
        });

        it('reads dirctory doesn\'t return null',  async ()=> {
            var dir = "./tests/";
            var result = await fileOperations.asyncReadDirectory(dir);
            assert.notEqual(result,null);
        });
        
        it('returns -1 if dirctory doesn\'t exsit', async ()=> {
            var dir = "tests/fasd/";
            var result = await fileOperations.asyncReadDirectory(dir);
            assert.equal(result, -1);
        }); 
    })

    describe('Json parse tests', function() {
        it('parses json text to a json correctly', function(done) {
            var json1 = {"t1":1,"t2":"t3"};
            var json2 = fileOperations.parseJson('{"t1":1,"t2":"t3"}');
            assert.deepEqual(json1,json2);
            
            done();
        });
        
        it('returns -1 if not json text', function(done) {
            var resualt = fileOperations.parseJson('{t1":1,');
            assert.equal(resualt,-1);
            
            done();
        }); 
    })
});