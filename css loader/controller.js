var loader = require("./loader");
var fileOperations = require("../fileOperations");

var dirName = "./css loader/files/";
var defualtFileName = "./css loader/files/defualt.css";
var definitionsFileName = "./css loader/definitions.json";
function run() {
    var innerStyle = "";
    var outerStyle = "";
    var definitionsFile = fileOperations.readFile(definitionsFileName);
    if (definitionsFile == -1) {
        console.log("couldn't read definitions.json exiting... ");
        return;
    }

    var definitionsFileJson = fileOperations.parseJson(definitionsFile);
    if (definitionsFileJson == -1) {
        console.log("can't parse definitions.json as json exiting... ");
        return;
    }

    var defualtFile = fileOperations.readFile(defualtFileName);
    if (defualtFile == -1) {
        console.log("couldn't read defualt.css exiting... ");
        return;
    }

    var seprationObject = loader.separateDefinitionsByImportance(definitionsFileJson);
    var necessarySelectors = seprationObject.necessary;
    var defualtSelectors = seprationObject.defualt;

    var defualtHasNecessary = loader.checkCssHasSelectorList(necessarySelectors, defualtFile)
    if (defualtHasNecessary == -1) {
        console.log("defualt.css is missing necessary selectors exiting... ");
        return;
    }

    var defualtHasDefualt = loader.checkCssHasSelectorList(defualtSelectors, defualtFile)
    if (defualtHasDefualt == -1) {
        console.log("defualt.css is missing defualt selectors exiting... ");
        return;
    }

    var defualtData = loader.extractCssValuesOfSelectorList(defualtSelectors, defualtFile);
    var filesNames = fileOperations.readDirectory(dirName);
    if (filesNames == -1) {
        console.log("can't read files directory exiting... ");
        return;
    }

    var styleIndex = 1;
    filesNames.forEach(file => {
        fileData = fileOperations.readFile(dirName + file);
        if (fileData == -1) {
            console.log("issue with file:" + file + " skipping..");
            return
        }

        var hasNecessary = loader.checkCssHasSelectorList(necessarySelectors, fileData);
        if (hasNecessary == -1) {
            console.log(file + " is missing necessary selectors skipping..");
            return
        }

        var defualtsStyleObject = loader.creteBodyFromDefualt(defualtSelectors, defualtData, styleIndex, fileData);
        var styleObject = loader.createStyleFromSingleCSS(styleIndex, fileData);

        innerStyle += styleObject.innerStyle+defualtsStyleObject.innerStyle;
        outerStyle += styleObject.outerStyle+defualtsStyleObject.outerStyle;
        styleIndex++;

    });
    
    console.log(outerStyle+innerStyle);
    console.log("finised succsuffuly");
    return outerStyle + innerStyle;
}

run();