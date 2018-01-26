define(function(require) {
    var Backbone = require('backbone');
    var Marionette = require('backbone.marionette');
    
    var AppView = require('./app.view');
    var AppRouter = require('./app.router');

    var Application = Marionette.Application.extend({
        region: '#app',
        onStart: function() {
            this.view = new AppView();

            this.router = new AppRouter({view: this.view});
            this.showView(this.view);
            
            Backbone.history.start();
        }
    });
    
    return new Application();
});

