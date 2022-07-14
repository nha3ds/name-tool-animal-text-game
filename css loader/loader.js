
function separateDefinitionsByImportance(definitionsJson) {
    var definitionsNecessary = [];
    var definitionsDefualt = [];
    for (var k = 0; k < definitionsJson.length; k++) {
        var selector = definitionsJson[k].selector;
        var importance = definitionsJson[k].importance;
        if (importance === "necessary")
            definitionsNecessary.push(selector);
        if (importance === "defualt")
            definitionsDefualt.push(selector);
    }
    return { 'necessary': definitionsNecessary, 'defualt': definitionsDefualt }
}

function checkCssHasSelectorList(selectorList, cssText) {
    if (selectorList.length < 1)
        return -1;
    for (var k = 0; k < selectorList.length; k++) {
        var tag = selectorList[k];
        var tagValue = findCssEntry(tag, cssText);
        //console.log(tag+":"+tagValue);
        if (tagValue == -1) {
            return -1;
            //console.log("defualt.css is missing necesary fields exiting... ");
        }
    }
    return 1;
}

function extractCssValuesOfSelectorList(selectorList, cssText) {
    if (selectorList.length < 1)
        return -1;
    data = [];
    for (var k = 0; k < selectorList.length; k++) {
        var tag = selectorList[k];
        var tagValue = findCssEntry(tag, cssText);
        //console.log(tag+":"+tagValue);
        if (tagValue == -1) {
            return -1;
            //console.log("defualt.css is missing necesary fields exiting... ");
        }
        data.push(tagValue);
    }
    return data;
}

function creteBodyFromDefualt(definitionsDefualt, defualtData, styleIndex, css) {
    var innerStyle = "";
    var outerStyle = "";
    for (var k = 0; k < definitionsDefualt.length; k++) {
        var tag = definitionsDefualt[k];
        var defualtValue = defualtData[k];
        var tagValue = findCssEntry(tag, css);
        if (tagValue == -1) {
            innerStyle += addStyleNumberToCss(tag, styleIndex, defualtValue);
            outerStyle += addOuterStyleNumberToCss(tag, styleIndex, defualtValue);
        }
    }
    return { 'innerStyle': innerStyle, 'outerStyle': outerStyle };
}

function addStyleNumberToCss(selector, styleIndex, value) {
    if (selector == 'body')
        return ".style" + styleIndex + " " + value + "\n";
    else
        return ".style" + styleIndex + " " + selector + " " + value + "\n"
}

function addOuterStyleNumberToCss(selector, styleIndex, value) {
    if (selector == 'body')
        return ".outer_style" + styleIndex + " " + value + "\n";
    else
        return ".outer_style" + styleIndex + " " + selector + " " + value + "\n"
}


function createStyleFromSingleCSS(styleIndex, css) {
    var innerStyle = "";
    var outerStyle = "";

    var i = css.indexOf('{');
    while (i > -1) {
        var j = css.indexOf('}');
        var selector = css.substring(0, i).trim();
        var value = css.substring(i, j + 1).trim();
        css = css.substring(j + 1)

        i = css.indexOf('{');
        innerStyle += addStyleNumberToCss(selector, styleIndex, value);
        outerStyle += addOuterStyleNumberToCss(selector, styleIndex, value);

    }

    return { 'innerStyle': innerStyle, 'outerStyle': outerStyle };
}

function createStyleFromAllCSS(cssList) {
    var innerStyle = "";
    var outerStyle = "";
    for (var i = 0; i < cssList.length; i++) {
        var resualt = createStyleFromSingleCSS(i + 1, cssList[i]);
        innerStyle += resualt.innerStyle;
        outerStyle += resualt.outerStyle;
    }
    return { 'innerStyle': innerStyle, 'outerStyle': outerStyle };
}

/*
fs.readdir(path.join(__dirname, dir), function (err, files) {
    //handling error
    if (err) {
        return console.log('Unable to scan directory: ' + err);
    } 
    
    /*
    //defualt.css
    var indexOfDefualt = files.indexOf("defualt.css");
    if (indexOfDefualt < 0)
        return console.log('Couldn\'t find defualt.css exiting...');
    var defualtFile;
    try{
        defualtFile = fs.readFileSync(path.join(__dirname, dir+'defualt.css'), 'utf8');
    }
    catch (err){
        return console.log("couldn't read defualt.css exiting... ");
    }

    // validate necessary
    for (var k = 0; k < definitionsNecessary.length; k++)
    {
        var tag = definitionsNecessary[k];
        
        var tagValue = findCssEntry(tag,defualtFile);
        console.log(tag+":"+tagValue);
        if(tagValue == -1)
        {
            return console.log("defualt.css is missing necesary fields exiting... ");
        }
    }

    var defualtData = [];
    for (var k = 0; k < definitionsDefualt.length; k++)
    {
        var tag = definitionsDefualt[k];
        var tagValue = findCssEntry(tag,defualtFile);
        console.log(tag+":"+tagValue);
        if(tagValue == -1)
        {
            return console.log("defualt.css is missing necesary fields exiting... ");
        }
        defualtData.push(tagValue);
    }
    

    //rest of files
    var styleIndex = 0;
    var innerStyle = "";
    var outerStyle = "";
    //listing all files using forEach
    files.forEach(function (file) {
        fs.readFile(path.join(__dirname, dir+file), 'utf8', function(err, contents) {
            
            for (var k = 0; k < definitionsNecessary.length; k++)
            {
                var tag = definitionsNecessary[k];
                
                var tagValue = findCssEntry(tag,contents);
                if(tagValue == -1)
                {
                    console.log(file+" is missing necesary fields skipping... ");
                    break;
                }
            }

            for (var k = 0; k < definitionsDefualt.length; k++)
            {
                var tag = definitionsDefualt[k];
                var defualtValue = defualtData[k];
                var tagValue = findCssEntry(tag,contents);
                if(tagValue == -1)
                {
                    
                    if (tag === "body")
                    {
                        innerStyle += ".style"+(styleIndex+1)+" "+defualtValue+"\n"
                        outerStyle += ".outer_style"+(styleIndex+1)+" "+defualtValue+"\n"
                    }
                    else
                    {
                        innerStyle += ".style"+(styleIndex+1)+" "+tag+" "+defualtValue+"\n"
                        outerStyle += ".outer_style"+(styleIndex+1)+" "+tag+" "+defualtValue+"\n"
                    }
                }
            }

            //read content of the file and append output
            var i = contents.indexOf('{');
            while (i > -1)
            {
                var j =  contents.indexOf('}');
                var selector = contents.substring(0,i).trim();
                var value = contents.substring(i,j+1).trim();
                contents = contents.substring(j+1)

                i = contents.indexOf('{');
                if (selector === "body")
                {
                    innerStyle += ".style"+(styleIndex+1)+" "+value+"\n"
                    outerStyle += ".outer_style"+(styleIndex+1)+" "+value+"\n"
                }
                else
                {
                    innerStyle += ".style"+(styleIndex+1)+" "+selector+" "+value+"\n"
                    outerStyle += ".outer_style"+(styleIndex+1)+" "+selector+" "+value+"\n"
                }
            }
            styleIndex++;

            //if this is the last file replace old style with the new one
            if(styleIndex === files.length) {
              fs.writeFile(path.join(__dirname, "style.css"), outerStyle+innerStyle, function(err) {
                if(err) {
                    return console.log(err);
                }
                console.log("successfully replaced the old style.");
            });
            }
        });
          
    });
    
});
*/

function findCssEntry(entry, text) {
    var i = text.indexOf(entry);
    if (i < 0)
        return -1;

    if (!(text[i + entry.length] == " " || text[i + entry.length] == "{"))
        return -1;
    if (i > 0) {
        if (text[i - 1] != " " && text[i - 1] != "\n")
            return -1;
    }
    var subText = text.substring(i);
    var j = subText.indexOf("{");
    if (j < 0)
        return -1;
    var k = subText.indexOf("}");
    if (k < 0)
        return -1;
    return subText.substring(j, k + 1);
}


exports.separateDefinitionsByImportance = separateDefinitionsByImportance;
exports.checkCssHasSelectorList = checkCssHasSelectorList;
exports.findCssEntry = findCssEntry;
exports.extractCssValuesOfSelectorList = extractCssValuesOfSelectorList;
exports.creteBodyFromDefualt = creteBodyFromDefualt;
exports.createStyleFromSingleCSS = createStyleFromSingleCSS;
exports.createStyleFromAllCSS = createStyleFromAllCSS;
exports.addStyleNumberToCss = addStyleNumberToCss;
exports.addOuterStyleNumberToCss = addOuterStyleNumberToCss;