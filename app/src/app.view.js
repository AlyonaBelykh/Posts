define(function(require) {
    var Marionette = require('backbone.marionette');
    var _ = require('underscore');

    var HeaderView = require('./views/header.view');
    var DashboardView = require('./views/dashboard.view');
    var FooterView = require('./views/footer.view');

    var AppTemplate = require('text!./app.template.html');

    return Marionette.View.extend({
        template: _.template(AppTemplate),
        regions: {
            header: '#header',
            outlet: '#outlet',
            footer: '#footer'
        },
        onAttach: function() {
            this.showChildView('header', new HeaderView());
            this.showChildView('footer', new FooterView());
        }
    });
});

