define(function(require) {
    var Backbone = require('backbone');

    var CommentModel = require('../models/comment.model');

    return Backbone.Collection.extend({
         //url: '/api/comments',
        model: CommentModel,
        url: function(){
            return '/api/comments/' + this.postId;
        },
        initialize: function(models, options){
            this.models = models;
            this.postId = options.id ;

        }
    });
});