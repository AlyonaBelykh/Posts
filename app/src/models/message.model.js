define(function(require) {
    var Backbone = require('backbone');

    return Backbone.Model.extend({
        urlRoot:'/api/post',
        defaults: {
            title: '',
            body: ''
        }
    });
});