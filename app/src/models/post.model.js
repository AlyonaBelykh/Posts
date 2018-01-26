define(function(require) {
    var Backbone = require('backbone');

    return Backbone.Model.extend({
        urlRoot: '/api/post',
        defaults: {
            userId: -1,
            author: '',
            title: '',
            body: ''
        }
    });
});