define(function(require) {
    var Backbone = require('backbone');

    var UserModel = require('../models/user.model');

    return Backbone.Collection.extend({
        url: '/api/user',
        model: UserModel
    });
});
