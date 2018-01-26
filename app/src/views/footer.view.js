define(function(require) {
    var Marionette = require('backbone.marionette');
    var _ = require('underscore');

    var FooterTemplate = require('text!../templates/footer.template.html');
    var UserService = require('../services/user.service');

    return Marionette.View.extend({
        template: _.template(FooterTemplate),
        templateContext: function(){
            return {
                user: UserService.user.attributes
            }
        }
    });
});