define(function(require) {
    var Marionette = require('backbone.marionette');
    var _ = require('underscore');

    var NotFoundView = require('text!../templates/not-found.template.html');

    return Marionette.View.extend({
        template: _.template(NotFoundView)
    });
});