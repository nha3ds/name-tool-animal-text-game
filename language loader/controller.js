var loader = require("./loader");
var fileOperations = require("../fileOperations");
var dirName = "./language loader/files/";
var definitionsFileName = "./language loader/definitions.txt";
function run()
{
    var definitionsData =  fileOperations.readFile(definitionsFileName)
    var dirFilesNames;
    if(definitionsData == -1)
        return console.log("Couldn't read definitions.txt exiting...");

    dirFilesNames = fileOperations.readDirectory(dirName)
    if(dirFilesNames == -1)
        return console.log("Couldn't read language files dirctory exiting...");

    var definitionsDataList = loader.extractLanguageDefinitions(definitionsData);

    var languages = [];
    dirFilesNames.forEach(file => {
        var language = fileOperations.readFile(dirName+file);
        if(language == -1)
            console.log("Couldn't read "+file+" skipping...");
        else
        {
            var languageJson = fileOperations.parseJson(language);
            if (languageJson == -1)
                console.log(file+" isn't in a correct json format skipping...");
            else
            {
                
                var isValid = loader.validateLanguage(definitionsDataList,languageJson);
                if(isValid == 1)
                    languages.push(languageJson);
                else
                    console.log(file+" is invalid skipping...");
            }
        }
        
    });

    return languages;
}

exports.run = run;