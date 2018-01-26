define(function(require) {
    var Marionette = require('backbone.marionette');
    var _ = require('underscore');

    var CommentsTemplate = require('text!../templates/comment-form.template.html');
    var CommentModel = require('../models/comment.model');
    var UserService = require('../services/user.service');

    return Marionette.View.extend({
        template: _.template(CommentsTemplate),
        templateContext: function(){
            return {
                user: UserService.user.attributes,
            }
        },
        events:{
            'submit #commentForm': 'onSubmit'
        },
        onSubmit: function(event){
            event.preventDefault();
            
            var comment = new CommentModel({
                text: event.target['text'].value,
                postId: this.options.postId
            });

            comment.save(null, {
                success: comment => this.collection.add(comment)
            });
        },
         
    });
});
