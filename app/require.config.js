requirejs.config({
    baseUrl: './',
    waitSeconds: 3,
    paths: {
        'text': './bower_components/text/text',
        'jquery': './bower_components/jquery/dist/jquery.min',
        'underscore': './bower_components/underscore/underscore-min',
        'backbone': './bower_components/backbone/backbone-min',
        'backbone.marionette': './bower_components/backbone.marionette/lib/backbone.marionette.min',
        'backbone.radio': './bower_components/backbone.radio/build/backbone.radio.min'
    }
});

define(function(require) {
    var app = require('./src/app');
    app.start();
});
