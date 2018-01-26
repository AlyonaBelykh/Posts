define(function(require) {
    var Marionette = require('backbone.marionette');

    var UserModel = require('../models/user.model');

    var UserService = Marionette.Object.extend({
        initialize: function() {
            this.user = new UserModel();
            this.user.fetch();
        },
        update: function() {
            this.user.fetch();
        },
        signIn: function() {
            window.location.pathname = '/signin';
         },
        signOut: function() {
            var self = this;
            $.ajax({
                url: '/api/signout',
                method: 'POST',
                success: function() {
                    self.user.clear();
                }
            });


        }
    });
    
    return new UserService();
});