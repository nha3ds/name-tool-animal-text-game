var assert = require('assert');
var server = require('../server');
var app = server.app;
const request = require('supertest');

describe('Server Tests', function () {
  this.beforeAll(function () {
    server.setLanguages(["en"]);
    server.setLanguages(["ar"]);
    server.setDefualt();
  })
  describe('Languages tests', function () {
    it('respond with 200 if language was set', function (done) {
      request(app)
        .get('/en')
        .expect(200, done);
    });

    it('respond with 404 if language wasn\'t set', function (done) {
      request(app)
        .get('/english')
        .expect(404, done);
    });

    it('respond sets cookie of a language', function (done) {
      request(app)
        .get('/ar')
        .expect('set-cookie', 'lang=ar; Path=/', done);
      });
      
  });

  describe('Home tests', function () {
    it('respond with 200 for home', function (done) {
      request(app)
        .get('/')
        .expect(200, done);
    });
      
  });

});

