const express = require('express');
const router = express.Router();
const passport = require('passport');

const { CommentModel } = require('../database/connection');

router.get('/comments/:postId', (req, res) => {
    const {postId} = req.params;
 
    CommentModel.findAll(
        {where: {postId}}
    ).then(comments => res.send(comments));

});

router.post('/comment', (req, res) => {
    const {postId} = req.body;

    if (!req.user) {
        return res.status(401).send();
    }

    const userId = req.user.dataValues.id;
    const {username} = req.user.dataValues;

        CommentModel.create({
            author: username,
            userId,
            postId,
            text: req.body.text
        }).then(comment => res.send(comment));
});

router.get('/comment/:id', (req, res) => {
    CommentModel.findByPostId(req.params.id).then(comment => res.send(comment));
});

router.delete('/comment/:id', (req, res) => {
    if (!req.user) {
        res.status(401).send();
    }
    const userId = req.user.dataValues.id;
    const {id}= req.params;
    CommentModel.findOne({where:{id}}).then( comment => {
        if(comment.dataValues.userId != userId){
             res.status(403).send();
        } else {
            CommentModel.destroy({where: {id: req.params.id}}).then(id => res.send({deleted: id}));
        }
    });
});

module.exports = router;
