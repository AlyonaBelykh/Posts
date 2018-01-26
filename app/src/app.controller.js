define(function(require) {
    var Marionette = require('backbone.marionette');

    var DashboardView = require('./views/dashboard.view');
    var NotFoundView = require('./views/not-found.view');
    //var SigninView = require('./views/signin.view');
    //var SignupView = require('./views/signup.view');

    return Marionette.Object.extend({
        showDashboard: function() {
            this.options.view.showChildView('outlet', new DashboardView());
        },
        /*showSignin: function() {
            this.options.view.showChildView('outlet', new SignupView());
        },
        showSignup: function() {
            this.options.view.showChildView('outlet', new SigninView());
        },*/
        showNotFound: function() {
            this.options.view.showChildView('outlet', new NotFoundView());
        }
    });
});