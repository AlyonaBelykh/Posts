define(function(require) {
    var Marionette = require('backbone.marionette');

    var _ = require('underscore');
    var $ = require('jquery');

    var MenuTemplate = require('text!../templates/menu.template.html');

    var UserService = require('../services/user.service');

    return Marionette.View.extend({
        template: _.template(MenuTemplate),
        events: {
            'click #authLink': 'onAuthLinkClick'
        },
        templateContext: function() {
            return {
                username: UserService.user.attributes.username
            };
        },
        initialize: function() {
            UserService.user.on('change', this.onUserChange, this);
        },
        onAuthLinkClick: function() {
            if (UserService.user.attributes.username) {
                UserService.signOut();
            } else {
                UserService.signIn();
            }
        },
        onUserChange: function() {
            this.render();
        }
    });
});