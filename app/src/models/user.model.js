define(function(require) {
    var Backbone = require('backbone');

    return Backbone.Model.extend({
        urlRoot: '/api/user/me',
        defaults: {
            userId: -1,
            username: ''
        }
    });
});
