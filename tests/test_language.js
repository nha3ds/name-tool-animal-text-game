var assert = require('assert');
var languageLoader = require('../language loader/loader');

describe('Language Loader Tests', function() {
    describe('ValidateLanguage tests', function() {
        it('returns 1 if all definitions entries are in the language', function(done) {
            var language = {"entry1":"hello","entry2":"world"};
            var resualt = languageLoader.validateLanguage(["entry1","entry2"],language); 
            assert.equal(1,resualt);
            done();
        });

        it('returns -1 if not all definitions entries are in the language', function(done) {
            var language = {"en":"hello","entry2":"world"};
            var resualt = languageLoader.validateLanguage(["entry1","entry2"],language); 
            assert.equal(-1,resualt);
            done();
        });

        it('returns -1 if an entry is empty in the language', function(done) {
            var language = {"entry1":"","entry2":"world"};
            var resualt = languageLoader.validateLanguage(["entry1","entry2"],language); 
            assert.equal(-1,resualt);
            done();
        });
    })

    it('extracts definitions into a list correctly', function(done) {
        var extraction = languageLoader.extractLanguageDefinitions("entry1,entry2");
        var languageEntriers = ["entry1","entry2"];
        assert.deepEqual(languageEntriers,extraction);
        done();
     });
});