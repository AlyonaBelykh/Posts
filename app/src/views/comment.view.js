define(function (require) {
    var Marionette = require('backbone.marionette');
    var _ = require('underscore');
    var $ = require('jquery');
    var UserService = require('../services/user.service');
    var CommentTemplate = require('text!../templates/comment.template.html');

    return Marionette.View.extend({
        tagName: 'li',
        template: _.template(CommentTemplate),
        templateContext: function () {
            return {
                user: UserService.user.attributes,
                model: this.model.attributes
            }
        },
        events: {
            'mouseup .delete-comment': 'onDelete'
        },
        onDelete: function () {
            event.preventDefault();
            this.model.destroy({
                wait: true
            });
            this.render()
        }
    });
});