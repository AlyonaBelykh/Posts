define(function(require) {
    var Backbone = require('backbone');

    return Backbone.Model.extend({
        url: '/api/like',
        defaults: {
            userId: -1,
            postId: -1
        }
    });
});