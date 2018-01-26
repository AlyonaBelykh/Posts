define(function(require) {
    var Backbone = require('backbone');

    return Backbone.Model.extend({
        url: '/api/user/me',
        defaults: {
            username: ''
        }
    });
});
