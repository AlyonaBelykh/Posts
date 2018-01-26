'use strict';
const HTTPStatus = require('http-status');
const { PostModel } = require('../database/connection');
const preAuthorize = {

    authorized: function (req, res, next) {
        console.log(req.user);
        if (!req.user) {
            res.status(HTTPStatus.UNAUTHORIZED).send();
            return null;
        }

        next();
        return null;
    },
};

module.exports = preAuthorize;
