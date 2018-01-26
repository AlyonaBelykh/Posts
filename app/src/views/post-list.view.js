define(function(require) {
    var Marionette = require('backbone.marionette');

    var PostView = require('./post.view');

    return Marionette.CollectionView.extend({
        tagName: 'ul',
        childView: PostView
    });
});