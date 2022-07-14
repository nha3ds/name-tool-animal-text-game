var port = process.env.port||3000;
var server = require('./server');
var app = server.app;
var langugaeController = require('./language loader/controller');
setupServer(server)
server.setDefualt();
app.listen(port,function() {
    console.log(`listening at port ${port}`);
    
})

function setupServer(server) {
    var languages = langugaeController.run();
    var languagesCodes = [];
    languages.forEach(language => {
        languagesCodes.push(language.lang);
    });
    server.setLanguages(languagesCodes)
    
}

