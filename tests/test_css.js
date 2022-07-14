var assert = require('assert');
var loader = require('../css loader/loader');
describe('CSS Tests', function () {
    describe('Separating json css list by importance tests', function () {
        it('separate json into 2 list correctly', function (done) {
            var json = [{ 'selector': "a", 'importance': 'necessary' },
            { 'selector': "body", 'importance': "necessary" },
            { 'selector': "h1", 'importance': 'defualt' },
            { 'selector': "h2", 'importance': 'defualt' }];

            var result = loader.separateDefinitionsByImportance(json);
            var object = { 'necessary': ["a", "body"], 'defualt': ["h1", "h2"] }
            assert.deepEqual(object, result);

            done();
        });

        it('ignores optional selectors', function (done) {
            var json = [{ 'selector': "a", 'importance': 'necessary' },
            { 'selector': "body", 'importance': "defualt" }, { 'ww': "#test" }];

            var result = loader.separateDefinitionsByImportance(json);
            var object = { 'necessary': ["a"], 'defualt': ["body"] }
            assert.deepEqual(object, result);

            done();
        });
    })

    describe('findCssEntry tests', function () {
        it('returns content when css entry is there', function (done) {
            var css = "body{width:32} .asd{} #test{testContent}";
            var entry = "#test"
            var result = loader.findCssEntry(entry, css);
            assert.equal(result, "{testContent}");
            done();
        });

        it('returns -1 when css entry isn\'t there', function (done) {
            var css = "body{width:32} .asd{} #test{}";
            var entry = "gdsag"
            var result = loader.findCssEntry(entry, css);
            assert.equal(result, -1);

            done();
        });

        it('returns -1 when css when only begaining of entry is there ', function (done) {
            var css = "body{width:32} .asd{} #test{}";
            var entry = "bod"
            var result = loader.findCssEntry(entry, css);
            assert.equal(result, -1);

            done();
        });

        it('returns -1 when css when only ending of entry is there ', function (done) {
            var css = " body{width:32} .asd{} #test{}";
            var entry = "ody"
            var result = loader.findCssEntry(entry, css);
            assert.equal(result, -1);

            done();
        });
    })

    describe('checkCssHasSelectorList tests', function () {
        it('returns 1 when css have selectors correctly', function (done) {
            var css = "body{width:32} .asd{} #test{}";

            var result = loader.checkCssHasSelectorList(["body", ".asd"], css);
            assert.equal(result, 1);
            done();
        });

        it('returns -1 when passed empty list', function (done) {
            var css = "body{width:32} .asd{gf} #test{}";

            var result = loader.checkCssHasSelectorList([], css);
            assert.equal(result, -1);
            done();
        });

        it('returns -1 when css dosn\'t have selectors', function (done) {
            var css = "body{width:32} .asd{}";

            var result = loader.checkCssHasSelectorList(["body", ".asd", "wgg"], css);
            assert.equal(result, -1);

            done();
        });
    })
    describe('extractCssValuesOfSelectorList tests', function () {
        it('returns content list inside { } when css have selectors', function (done) {
            var css = "body{width:32} .asd{gf} #test{}";

            var result = loader.extractCssValuesOfSelectorList(["body", ".asd"], css);
            assert.deepEqual(result, ["{width:32}", "{gf}"]);
            done();
        });

        it('returns -1 when passed empty list', function (done) {
            var css = "body{width:32} .asd{gf} #test{}";

            var result = loader.extractCssValuesOfSelectorList([], css);
            assert.equal(result, -1);
            done();
        });

        it('returns -1 when css dosn\'t have selectors', function (done) {
            var css = "body{width:32} .asd{}";

            var result = loader.extractCssValuesOfSelectorList(["body", ".asd", "wgg"], css);
            assert.equal(result, -1);

            done();
        });
    })

    
    describe('addStyleNumberToCss tests', function () {
        it('returns same css style but with .style{number} added before it', function (done) {
            var css = "{color:red}";

            var result = loader.addStyleNumberToCss("h1",6 , css);
            assert.equal(".style6 h1 {color:red}\n",result);
            done();
        });

        it('it dosen\'t add body tag', function (done) {
            var css = "{color:red}";

            var result = loader.addStyleNumberToCss("body",6 , css);
            assert.equal(".style6 {color:red}\n",result);
            done();
        });
    })

    describe('addOuterStyleNumberToCss tests', function () {
        it('returns same css style but with .outer_style{number} added before it', function (done) {
            var css = "{color:red}";

            var result = loader.addOuterStyleNumberToCss("h1",6 , css);
            assert.equal(".outer_style6 h1 {color:red}\n",result);
            done();
        });

        it('it dosen\'t add body tag', function (done) {
            var css = "{color:red}";

            var result = loader.addOuterStyleNumberToCss("body",6 , css);
            assert.equal(".outer_style6 {color:red}\n",result);
            done();
        });
    })

    describe('creteBodyFromDefualt tests', function () {
        it('create defualt style from css and defualt style', function (done) {
            var css = "body{width:32} .asd2{gf} #test{}";

            var result = loader.creteBodyFromDefualt(["body", ".asd","#test2"],
            ["{re}","{height:45}","{color:green}"],4 ,css);
            var innerStyle = ".style4 .asd {height:45}\n.style4 #test2 {color:green}\n";
            var outerStyle= ".outer_style4 .asd {height:45}\n.outer_style4 #test2 {color:green}\n";
            assert.deepEqual(result,{ 'innerStyle': innerStyle, 'outerStyle': outerStyle });
            done();
        });
    })

    describe('createStyleFromSingleCSS tests', function () {
        it('create style from single css', function (done) {
            var css = "body{width:32} .asd2{gf} #test{}";
            
            var result = loader.createStyleFromSingleCSS(4,css);
            var innerStyle = ".style4 {width:32}\n.style4 .asd2 {gf}\n.style4 #test {}\n";
            var  outerStyle = ".outer_style4 {width:32}\n.outer_style4 .asd2 {gf}\n.outer_style4 #test {}\n";
            assert.deepEqual(result,{ 'innerStyle': innerStyle, 'outerStyle': outerStyle });
            done();
        });
    })

    describe('createStyleFromAllCSS tests', function () {
        it('create style from all css', function (done) {
            var css1 = "body{width:32} .asd2{gf} #test{}";
            var css2 = "body{width:32}  #tes2t{} .tes3 {color:pink}";
            var cssList = [css1,css2];
            var result = loader.createStyleFromAllCSS(cssList);
            var innerStyle = ".style1 {width:32}\n.style1 .asd2 {gf}\n.style1 #test {}\n.style2 {width:32}\n.style2 #tes2t {}\n.style2 .tes3 {color:pink}\n";
            var  outerStyle = ".outer_style1 {width:32}\n.outer_style1 .asd2 {gf}\n.outer_style1 #test {}\n.outer_style2 {width:32}\n.outer_style2 #tes2t {}\n.outer_style2 .tes3 {color:pink}\n";
            assert.deepEqual(result,{ 'innerStyle': innerStyle, 'outerStyle': outerStyle });
            done();
        });
    })

});