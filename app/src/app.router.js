define(function(require) {
    var Marionette = require('backbone.marionette');
    var AppController = require('./app.controller');

    return Marionette.AppRouter.extend({
        initialize: function(options) {
            this.controller = new AppController({view: options.view});
        },
        appRoutes: {
            '': 'showDashboard',
            'post': 'showDashboard',
            //'signup': 'showSignup',
            //'signin': 'showSignin',
            '*path': 'showNotFound'
        }
    });
});