const path = require('path');
var fs = require('fs');

function readFile(fileName)
{ 
    //console.log((path.join(__dirname, fileName)));
    try{
        return fs.readFileSync(path.join(__dirname, fileName), 'utf8');
    }
    catch (err){
        return -1 
        //console.log("couldn't read definitions.json exiting... ");
    }
}

function parseJson(text)
{
    try{
        return JSON.parse(text);
    }
    catch (err){
        return -1 
        // return console.log("bad josn format in definitions.json exiting... ");
    }
}


//read directory
function readDirectory (dir)
{
    try
    {
        var files = fs.readdirSync(path.join(__dirname, dir));
        return files;
    }

    catch (err)
    {
        return -1;
    }
}

function asyncReadDirectory (dir)
{
    return new Promise(resolve => {
       

        fs.readdir(path.join(__dirname, dir), function (err, files) {
            
            //handling error
            if (err) {
                resolve(-1);
                //console.log('Unable to scan directory: ' + err);
            }
            resolve(files);
        });

      });   
}


/*
var fs = require('fs');
 
var contents = fs.readFileSync(path.join(__dirname, './style.css'), 'utf8');
console.log(contents);
*/

exports.readFile = readFile;
exports.parseJson = parseJson;
exports.readDirectory = readDirectory;
exports.asyncReadDirectory = asyncReadDirectory;