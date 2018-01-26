define(function (require) {
    var Marionette = require('backbone.marionette');
    var _ = require('underscore');
    var CommentView = require('../views/comment.view')

    return Marionette.CollectionView.extend({
        tagName: 'ul',
        childView: CommentView,

        filter: function (child, index, collection) {
            if (this.showAll) {
                return true;
            } else {
                var arrLength = collection.models.length;
                return (index >= (arrLength - 1))
            }
        },
    })
});