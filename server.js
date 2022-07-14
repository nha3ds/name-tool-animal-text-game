
const express = require('express');
const app = express();
var cookieParser = require('cookie-parser')
app.use(cookieParser())
var languages = [];
var isDebugMode = true;

function setLanguages(languagesList) {
  languages = languagesList;
  updateLanguages();
}

function updateLanguages() {
  for (let i = 0; i < languages.length; i++) {
    const language = languages[i];
    app.get('/' + language, function (req, res) {
      //console.log('Cookies: ', req.cookies)
      res.cookie('lang', language);
      res.status(200).json({ language: language });
    });
  }


  // app.get('/en',function (req, res) {
  //   res.status(404).send('');
  // });
  // if (isDebugMode)
  // {
  // }
}

function setDefualt() {
  app.get('/', function (req, res) {
    var lang = req.cookies.lang;
    var index = languages.indexOf(lang);
    console.log('cookies lang:'+lang+" index:"+index);    
    if (index > -1) {
      console.log("redirecting");
      res.redirect('/' + languages[index]);
    }
    else
      res.status(200).json({ text: 'test' });
  });
}

exports.setLanguages = setLanguages;
exports.setDefualt = setDefualt;
exports.app = app;

