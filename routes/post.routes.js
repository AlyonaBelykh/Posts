const express = require('express');
const router = express.Router();
const preAuthorize = require('../helper/preAuthorize');
const { PostModel } = require('../database/connection');

router.get('/post', (req, res) => {
    PostModel.findAll().then(posts => res.send(posts));
});

router.post('/post', (req,res) => {
     if (!req.user) {
        return res.status(401).send();
    }
    const {username} = req.user.dataValues;
    PostModel.create({
        author: username,
        title: req.body.title,
        body: req.body.body,
        userId: req.user.dataValues.id
    }).then(post => res.send(post));
});

router.get('/post/:id', (req, res) => {
    PostModel.findById(req.params.id).then(post => res.send(post));
});

router.delete('/post/:id', preAuthorize.authorized, (req, res) => {
    if (!req.user) {
        res.status(401).send();
    }
    const userId = req.user.dataValues.id;
    const {id}= req.params;
    PostModel.findOne({where:{id}}).then( post => {
        if (post.dataValues.userId != userId) {
            res.status(403).send();
        } else {
            PostModel.destroy({where: {id: req.params.id}}).then((number) => {
                res.send({deleted: number})
            });
        }
    })
});

module.exports = router;