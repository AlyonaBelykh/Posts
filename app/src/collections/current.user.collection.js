define(function(require) {
    var Backbone = require('backbone');

    var UserModel = require('../models/current.user.model');

    return Backbone.Collection.extend({
        url: '/api/user/me',
        model: UserModel
    });
});
