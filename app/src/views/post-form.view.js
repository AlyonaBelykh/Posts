define(function(require) {
    var Marionette = require('backbone.marionette');
    var _ = require('underscore');

    var PostFormTemplate = require('text!../templates/post-form.template.html');

    var PostModel = require('../models/post.model');
    var UserService = require('../services/user.service');
    return Marionette.View.extend({
        template: _.template(PostFormTemplate),
        templateContext: function(){
           return {
               user: UserService.user.attributes,
           }
        },
        events: {
             'submit #addMessage': 'onSubmit'
        },
        onSubmit: function (event) {
            event.preventDefault();
            
            var post = new PostModel({
                title: event.target['title'].value,
                body: event.target['body'].value,

            });
            
            post.save(null, {
                success: post => this.collection.add(post)
            });
        }
    });
});
