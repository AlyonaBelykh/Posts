define(function(require) {
    var Backbone = require('backbone');

    var PostModel = require('../models/post.model');

    return Backbone.Collection.extend({
        url: '/api/post',
        model: PostModel
    });
});