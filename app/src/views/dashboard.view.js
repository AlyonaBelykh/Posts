define(function (require) {
    var Marionette = require('backbone.marionette');
    var _ = require('underscore');

    var PostListView = require('./post-list.view');
    var PostFormView = require('./post-form.view');
    
    var DashboardTemplate = require('text!../templates/dashboard.template.html');

    var PostCollection = require('../collections/post.collection');
    var UsersCollection = require('../collections/users.collection');

    return Marionette.View.extend({
        template: _.template(DashboardTemplate),
        regions: {
            postList: '#postList',
            postForm: '#postForm',
        },

        onAttach: function () {
            var collection = new PostCollection();
            collection.fetch();

            this.showChildView('postList', new PostListView({
                collection: collection
            }));

            this.showChildView('postForm', new PostFormView({
                collection: collection,
            }));
        }
    });
});