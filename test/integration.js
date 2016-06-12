var co = require('co'),
  path = require('path'),
  request = require('supertest'),
  shell = require('shelljs'),
  waigo = require('waigo');

var test = require('waigo-test-utils').mocha(module);


test['method override'] = {
  beforeEach: function(done) {
    var self = this;

    shell.cp('-Rf', path.join(__dirname, '/../src/support'), utils.appFolder);

    co(function*() {
      yield* waigo.init({
        appFolder: utils.appFolder
      });

      self.Application = waigo.load('application');
      self.app = self.Application.app;

      self.startApp = function(cfg) {
        return utils.spawn(function*() {
          yield* self.Application.start(cfg);

          self.request = request(self.app.config.baseURL);
        });
      };

    })(done);
  },

  afterEach: function(done) {    
    utils.spawn(this.Application.shutdown)
      .then(function() {
        shell.rm('-rf', path.join(utils.appFolder, 'support'));
      })
      .nodeify(done);
  },

  'non-modified': function(done) {
    var self = this;

    self.startApp()
      .then(function() {
        self.request.get('/test')
          .expect('hello')
          .end(done);        
      })
      .catch(done);
  },

  'modified by query parameter': function(done) {
    var self = this;

    self.startApp()
      .then(function() {
        self.request.get('/test?_method=DELETE')
          .expect('deleted')
          .end(done);        
      })
      .catch(done);
  },

  'modified by body parameter': function(done) {
    var self = this;

    self.startApp({
      postConfig: function(config) {
        config.middleware.order = [
          'errorHandler',
          'bodyParser',
          'methodOverride'
        ];
      }
    })
      .then(function() {
        self.request.post('/test')
          .send({
            '_method': 'DELETE'
          })
          .expect('deleted')
          .end(done);        
      })
      .catch(done);
  },

};

