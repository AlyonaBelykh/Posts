define(function (require) {
    var Marionette = require('backbone.marionette');
    var _ = require('underscore');
    var $ = require('jquery');

    var PostTemplate = require('text!../templates/post.template.html');

    var PostCollection = require('../collections/post.collection');
    var CommentCollection = require('../collections/comment.collection');

    var LikeView = require('./like.view');
    var UserService = require('../services/user.service');
    var CommentFormView = require('../views/comment-form.view');
    var CommentListView = require('../views/comment-list.view');
    return Marionette.View.extend({
        tagName: 'li',
        template: _.template(PostTemplate),
        templateContext: function () {
            return {
                user: UserService.user.attributes,
                model: this.model.attributes,
                showAll: this.commentListView.showAll
            }
        },
        regions: {
            like: {
                el: '#like',
                replaceElement: true
            },
            commentForm: '#commentForm',
            comments: '#comments'
        },
        events: {
            'click .delete-blog': 'onDelete',
            'click #show': 'onShowCommentsClick'
        },
        initialize: function () {
            this.showAll = false;
            this.commentCollection = new CommentCollection([], {
                id: this.model.id
            });
            this.commentCollection.fetch();

        },
        onBeforeRender: function() {
            this.commentListView = new CommentListView({
                collection: this.commentCollection
            });
            this.commentListView.showAll = this.showAll;
        },
        onRender: function () {
            this.showChildView('like', new LikeView({
                postId: this.model.id
            }));

            this.showChildView('comments', this.commentListView);

            this.showChildView('commentForm', new CommentFormView({
                collection: this.commentCollection,
                postId: this.model.id
            }));

        },
        onShowCommentsClick: function () {
            this.showAll = !this.showAll;
            this.render();
        },

        onDelete: function () {
            this.model.destroy({
                wait: true
            });
        }
    });
});