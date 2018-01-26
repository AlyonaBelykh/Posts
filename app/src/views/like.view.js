define(function(require) {
    var Marionette = require('backbone.marionette');
    var _ = require('underscore');
    
    var LikeTemplate = require('text!../templates/like.template.html');
    var LikeModel = require('../models/like.model');

    return Marionette.View.extend({
        template: _.template(LikeTemplate),
        events: {
            'click': 'onClick'
        },
        templateContext: function() {
            return {
                likes: this.likes || []
            };
        },
        onRender: function() {
            this.likeIconElement = this.$el.find('i.like-icon');

            if (this.liked) {
                this.likeIconElement.addClass('active');
            } else {
                this.likeIconElement.removeClass('active');
            }
        },
        onAttach: function() {
            $.ajax({
                url: '/api/likes/' + this.options.postId,
                method: 'GET',
                success: res => this.updateLikes(res)
            });
        },
        onClick: function() {
            var like = new LikeModel({postId: this.options.postId});
            like.save(null, {
                success: res => this.updateLikes(res.attributes)
            });
        },
        updateLikes: function(data) {
            this.likes = data.likes;
            this.liked = data.liked;
            this.render();
        }
    });
});