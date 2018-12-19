'use strict';



;define('emtasks/adapters/application', ['exports', 'emberfire/adapters/firebase'], function (exports, _firebase) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });


    const { inject } = Ember;

    exports.default = _firebase.default.extend({
        firebase: inject.service()
    });
});
;define('emtasks/app', ['exports', 'emtasks/resolver', 'ember-load-initializers', 'emtasks/config/environment'], function (exports, _resolver, _emberLoadInitializers, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  const App = Ember.Application.extend({
    modulePrefix: _environment.default.modulePrefix,
    podModulePrefix: _environment.default.podModulePrefix,
    Resolver: _resolver.default
  });

  (0, _emberLoadInitializers.default)(App, _environment.default.modulePrefix);

  exports.default = App;
});
;define('emtasks/components/welcome-page', ['exports', 'ember-welcome-page/components/welcome-page'], function (exports, _welcomePage) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _welcomePage.default;
    }
  });
});
;define('emtasks/controllers/tasks', ['exports'], function (exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.default = Ember.Controller.extend({
        actions: {
            deleteTask: function (id) {
                this.store.findRecord('task', id).then(function (task) {
                    task.deleteRecord();

                    task.save();
                });
            }
        }
    });
});
;define('emtasks/controllers/tasks/edit', ['exports'], function (exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.default = Ember.Controller.extend({
        actions: {
            edittask: function () {
                var title = this.get('title');
                var description = this.get('description');
                var date = this.get('date');

                this.store.findRecord('task', id).then(function (task) {
                    task.set('title', title);
                    task.set('description', description);
                    task.set('date', new Date(date));

                    task.save();

                    self.transitionTo('tasks');
                });
            }
        }
    });
});
;define('emtasks/controllers/tasks/new', ['exports'], function (exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.default = Ember.Controller.extend({
        actions: {
            addtask: function () {
                var title = this.get('title');
                var description = this.get('description');
                var date = this.get('date');

                var newTask = this.store.createRecord('task', {
                    title: title,
                    description: description,
                    date: new Date(date)
                });

                newTask.save();

                this.setProperties({
                    title: '',
                    description: '',
                    date: ''
                });
            }
        }
    });
});
;define('emtasks/helpers/app-version', ['exports', 'emtasks/config/environment', 'ember-cli-app-version/utils/regexp'], function (exports, _environment, _regexp) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.appVersion = appVersion;
  function appVersion(_, hash = {}) {
    const version = _environment.default.APP.version;
    // e.g. 1.0.0-alpha.1+4jds75hf

    // Allow use of 'hideSha' and 'hideVersion' For backwards compatibility
    let versionOnly = hash.versionOnly || hash.hideSha;
    let shaOnly = hash.shaOnly || hash.hideVersion;

    let match = null;

    if (versionOnly) {
      if (hash.showExtended) {
        match = version.match(_regexp.versionExtendedRegExp); // 1.0.0-alpha.1
      }
      // Fallback to just version
      if (!match) {
        match = version.match(_regexp.versionRegExp); // 1.0.0
      }
    }

    if (shaOnly) {
      match = version.match(_regexp.shaRegExp); // 4jds75hf
    }

    return match ? match[0] : version;
  }

  exports.default = Ember.Helper.helper(appVersion);
});
;define('emtasks/helpers/format-date', ['exports'], function (exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.formatDate = formatDate;
    function formatDate(params) {
        return moment(params[0]).format('YYYY-MM-DD');
    }

    exports.default = Ember.Helper.helper(formatDate);
});
;define('emtasks/helpers/pluralize', ['exports', 'ember-inflector/lib/helpers/pluralize'], function (exports, _pluralize) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _pluralize.default;
});
;define('emtasks/helpers/singularize', ['exports', 'ember-inflector/lib/helpers/singularize'], function (exports, _singularize) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _singularize.default;
});
;define('emtasks/initializers/app-version', ['exports', 'ember-cli-app-version/initializer-factory', 'emtasks/config/environment'], function (exports, _initializerFactory, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  let name, version;
  if (_environment.default.APP) {
    name = _environment.default.APP.name;
    version = _environment.default.APP.version;
  }

  exports.default = {
    name: 'App Version',
    initialize: (0, _initializerFactory.default)(name, version)
  };
});
;define('emtasks/initializers/container-debug-adapter', ['exports', 'ember-resolver/resolvers/classic/container-debug-adapter'], function (exports, _containerDebugAdapter) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: 'container-debug-adapter',

    initialize() {
      let app = arguments[1] || arguments[0];

      app.register('container-debug-adapter:main', _containerDebugAdapter.default);
      app.inject('container-debug-adapter:main', 'namespace', 'application:main');
    }
  };
});
;define('emtasks/initializers/ember-data', ['exports', 'ember-data/setup-container', 'ember-data'], function (exports, _setupContainer) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: 'ember-data',
    initialize: _setupContainer.default
  };
});
;define('emtasks/initializers/emberfire', ['exports', 'emberfire/initializers/emberfire'], function (exports, _emberfire) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _emberfire.default;
});
;define('emtasks/initializers/export-application-global', ['exports', 'emtasks/config/environment'], function (exports, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.initialize = initialize;
  function initialize() {
    var application = arguments[1] || arguments[0];
    if (_environment.default.exportApplicationGlobal !== false) {
      var theGlobal;
      if (typeof window !== 'undefined') {
        theGlobal = window;
      } else if (typeof global !== 'undefined') {
        theGlobal = global;
      } else if (typeof self !== 'undefined') {
        theGlobal = self;
      } else {
        // no reasonable global, just bail
        return;
      }

      var value = _environment.default.exportApplicationGlobal;
      var globalName;

      if (typeof value === 'string') {
        globalName = value;
      } else {
        globalName = Ember.String.classify(_environment.default.modulePrefix);
      }

      if (!theGlobal[globalName]) {
        theGlobal[globalName] = application;

        application.reopen({
          willDestroy: function () {
            this._super.apply(this, arguments);
            delete theGlobal[globalName];
          }
        });
      }
    }
  }

  exports.default = {
    name: 'export-application-global',

    initialize: initialize
  };
});
;define('emtasks/instance-initializers/ember-data', ['exports', 'ember-data/initialize-store-service'], function (exports, _initializeStoreService) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: 'ember-data',
    initialize: _initializeStoreService.default
  };
});
;define('emtasks/models/task', ['exports', 'ember-data'], function (exports, _emberData) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.default = _emberData.default.Model.extend({
        title: _emberData.default.attr('string'),
        description: _emberData.default.attr('string'),
        date: _emberData.default.attr('date'),
        created: _emberData.default.attr('string', {
            defaultValue: function () {
                return new Date();
            }
        })
    });
});
;define('emtasks/resolver', ['exports', 'ember-resolver'], function (exports, _emberResolver) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _emberResolver.default;
});
;define('emtasks/router', ['exports', 'emtasks/config/environment'], function (exports, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  const Router = Ember.Router.extend({
    location: _environment.default.locationType,
    rootURL: _environment.default.rootURL
  });

  Router.map(function () {
    this.route('tasks', function () {
      this.route('new');
      this.route('edit', { path: '/edit/:task_id' });
    });
  });

  exports.default = Router;
});
;define('emtasks/routes/tasks', ['exports'], function (exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.default = Ember.Route.extend({
        model: function () {
            return this.store.findAll('task');
        }
    });
});
;define('emtasks/routes/tasks/edit', ['exports', 'emtasks/models/task'], function (exports, _task) {
   'use strict';

   Object.defineProperty(exports, "__esModule", {
      value: true
   });
   exports.default = Ember.Route.extend({});
});
;define('emtasks/routes/tasks/new', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Route.extend({});
});
;define('emtasks/services/ajax', ['exports', 'ember-ajax/services/ajax'], function (exports, _ajax) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _ajax.default;
    }
  });
});
;define('emtasks/services/firebase-app', ['exports', 'emberfire/services/firebase-app'], function (exports, _firebaseApp) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _firebaseApp.default;
});
;define('emtasks/services/firebase', ['exports', 'emberfire/services/firebase'], function (exports, _firebase) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _firebase.default;
});
;define("emtasks/templates/application", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "jfY+qUI7", "block": "{\"symbols\":[],\"statements\":[[7,\"nav\"],[11,\"class\",\"navbar navbar-default\"],[9],[0,\"\\n  \"],[7,\"div\"],[11,\"class\",\"container\"],[9],[0,\"\\n    \"],[7,\"div\"],[11,\"class\",\"navbar-header\"],[9],[0,\"\\n      \"],[7,\"button\"],[11,\"class\",\"navbar-toggle collapsed\"],[11,\"data-toggle\",\"collapse\"],[11,\"data-target\",\"#navbar\"],[11,\"aria-expanded\",\"false\"],[11,\"aria-controls\",\"navbar\"],[11,\"type\",\"button\"],[9],[0,\"\\n        \"],[7,\"span\"],[11,\"class\",\"sr-only\"],[9],[0,\"Toggle navigation\"],[10],[0,\"\\n        \"],[7,\"span\"],[11,\"class\",\"icon-bar\"],[9],[10],[0,\"\\n        \"],[7,\"span\"],[11,\"class\",\"icon-bar\"],[9],[10],[0,\"\\n        \"],[7,\"span\"],[11,\"class\",\"icon-bar\"],[9],[10],[0,\"\\n      \"],[10],[0,\"\\n      \"],[7,\"a\"],[11,\"class\",\"navbar-brand\"],[11,\"href\",\"#\"],[9],[0,\"Em Tasks\"],[10],[0,\"\\n    \"],[10],[0,\"\\n    \"],[7,\"div\"],[11,\"id\",\"navbar\"],[11,\"class\",\"collapse navbar-collapse\"],[9],[0,\"\\n      \"],[7,\"ul\"],[11,\"class\",\"nav navbar-nav\"],[9],[0,\"\\n        \"],[7,\"li\"],[9],[4,\"link-to\",[\"tasks\"],null,{\"statements\":[[0,\"Home\"]],\"parameters\":[]},null],[10],[0,\"\\n        \"],[7,\"li\"],[9],[4,\"link-to\",[\"tasks.new\"],null,{\"statements\":[[0,\"New Task\"]],\"parameters\":[]},null],[10],[0,\"\\n      \"],[10],[0,\"\\n    \"],[10],[0,\"\\n  \"],[10],[0,\"\\n\"],[10],[0,\"\\n\\n    \"],[7,\"div\"],[11,\"class\",\"container\"],[9],[0,\"\\n      \"],[7,\"div\"],[11,\"class\",\"row\"],[9],[0,\"\\n        \"],[7,\"div\"],[11,\"class\",\"col-md-12\"],[9],[0,\"\\n          \"],[1,[21,\"outlet\"],false],[0,\"\\n        \"],[10],[0,\"\\n      \"],[10],[0,\"\\n    \"],[10],[0,\"\\n\\n\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "emtasks/templates/application.hbs" } });
});
;define("emtasks/templates/tasks", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "WRa2nKyR", "block": "{\"symbols\":[\"task\"],\"statements\":[[1,[21,\"outlet\"],false],[0,\"\\n\"],[7,\"h1\"],[9],[0,\" Tasks\"],[10],[0,\"\\n\\n\"],[4,\"each\",[[23,[\"model\"]]],null,{\"statements\":[[0,\"  \"],[7,\"div\"],[11,\"class\",\"well\"],[9],[0,\"\\n    \"],[7,\"h4\"],[9],[4,\"link-to\",[\"tasks.edit\",[22,1,[\"id\"]]],null,{\"statements\":[[1,[22,1,[\"title\"]],false]],\"parameters\":[]},null],[10],[0,\"\\n    \"],[7,\"small\"],[9],[0,\"Due: \"],[1,[27,\"format-date\",[[22,1,[\"date\"]]],null],false],[10],[0,\"\\n    \"],[7,\"p\"],[9],[1,[22,1,[\"description\"]],false],[10],[0,\"\\n    \"],[7,\"button\"],[11,\"class\",\"btn btn-danger\"],[3,\"action\",[[22,0,[]],\"deleteTask\",[22,1,[\"id\"]]]],[9],[0,\"Delete\"],[10],[0,\"\\n  \"],[10],[0,\"\\n\"]],\"parameters\":[1]},null]],\"hasEval\":false}", "meta": { "moduleName": "emtasks/templates/tasks.hbs" } });
});
;define("emtasks/templates/tasks/edit", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "BrZeUEiu", "block": "{\"symbols\":[],\"statements\":[[7,\"form\"],[9],[0,\"\\n  \"],[7,\"div\"],[11,\"class\",\"form-group\"],[9],[0,\"\\n    \"],[7,\"label\"],[9],[0,\"Title\"],[10],[0,\" \\n    \"],[1,[27,\"input\",null,[[\"type\",\"class\",\"placeholder\",\"value\"],[\"text\",\"form-control\",\"Add Task\",[23,[\"model\",\"title\"]]]]],false],[0,\"\\n  \"],[10],[0,\"\\n  \"],[7,\"div\"],[11,\"class\",\"form-group\"],[9],[0,\"\\n    \"],[7,\"label\"],[9],[0,\"Due date\"],[10],[0,\" \\n    \"],[1,[27,\"input\",null,[[\"type\",\"class\",\"value\"],[\"date\",\"form-control\",[23,[\"model\",\"date\"]]]]],false],[0,\"\\n  \"],[10],[0,\"\\n  \"],[7,\"div\"],[11,\"class\",\"form-group\"],[9],[0,\"\\n    \"],[7,\"label\"],[9],[0,\"Description\"],[10],[0,\" \\n    \"],[1,[27,\"textarea\",null,[[\"placeholder\",\"class\",\"value\"],[\"Describe Task..\",\"form-control\",[23,[\"model\",\"description\"]]]]],false],[0,\"\\n  \"],[10],[0,\"\\n  \"],[7,\"button\"],[11,\"class\",\"btn btn-primary\"],[3,\"action\",[[22,0,[]],\"edittask\",[23,[\"model\",\"id\"]]]],[9],[0,\"Submit\"],[10],[0,\"\\n\"],[10],[0,\"   \"]],\"hasEval\":false}", "meta": { "moduleName": "emtasks/templates/tasks/edit.hbs" } });
});
;define("emtasks/templates/tasks/new", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "FJxA8/re", "block": "{\"symbols\":[],\"statements\":[[7,\"form\"],[9],[0,\"\\n  \"],[7,\"div\"],[11,\"class\",\"form-group\"],[9],[0,\"\\n    \"],[7,\"label\"],[9],[0,\"Title\"],[10],[0,\" \\n    \"],[1,[27,\"input\",null,[[\"type\",\"class\",\"placeholder\",\"value\"],[\"text\",\"form-control\",\"Add Task\",[23,[\"title\"]]]]],false],[0,\"\\n  \"],[10],[0,\"\\n  \"],[7,\"div\"],[11,\"class\",\"form-group\"],[9],[0,\"\\n    \"],[7,\"label\"],[9],[0,\"Due date\"],[10],[0,\" \\n    \"],[1,[27,\"input\",null,[[\"type\",\"class\",\"value\"],[\"date\",\"form-control\",[23,[\"date\"]]]]],false],[0,\"\\n  \"],[10],[0,\"\\n  \"],[7,\"div\"],[11,\"class\",\"form-group\"],[9],[0,\"\\n    \"],[7,\"label\"],[9],[0,\"Description\"],[10],[0,\" \\n    \"],[1,[27,\"textarea\",null,[[\"placeholder\",\"value\",\"class\"],[\"Describe Task..\",[23,[\"description\"]],\"form-control\"]]],false],[0,\"\\n  \"],[10],[0,\"\\n  \"],[7,\"button\"],[11,\"class\",\"btn btn-primary\"],[3,\"action\",[[22,0,[]],\"addtask\"]],[9],[0,\"Submit\"],[10],[0,\"\\n\"],[10],[0,\"   \"]],\"hasEval\":false}", "meta": { "moduleName": "emtasks/templates/tasks/new.hbs" } });
});
;define('emtasks/torii-providers/firebase', ['exports', 'emberfire/torii-providers/firebase'], function (exports, _firebase) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _firebase.default;
});
;

;define('emtasks/config/environment', [], function() {
  var prefix = 'emtasks';
try {
  var metaName = prefix + '/config/environment';
  var rawConfig = document.querySelector('meta[name="' + metaName + '"]').getAttribute('content');
  var config = JSON.parse(unescape(rawConfig));

  var exports = { 'default': config };

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;
}
catch(err) {
  throw new Error('Could not read config from meta tag with name "' + metaName + '".');
}

});

;
          if (!runningTests) {
            require("emtasks/app")["default"].create({"name":"emtasks","version":"0.0.0+7f4962b4"});
          }
        
//# sourceMappingURL=emtasks.map
