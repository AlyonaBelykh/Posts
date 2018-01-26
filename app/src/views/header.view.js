define(function(require) {
    var Marionette = require('backbone.marionette');
    var _ = require('underscore');

    var MenuView = require('./menu.view');

    var HeaderTemplate = require('text!../templates/header.template.html');

    return Marionette.View.extend({
        template: _.template(HeaderTemplate),
        regions: {
            menu: '#menu'
        },
        onAttach: function() {
            this.showChildView('menu', new MenuView());
        }
    });
});