const express = require('express');
const router = express.Router();
const passport = require('passport');

const { LikeModel } = require('../database/connection');

router.get('/likes/:postId', (req, res) => {
    const {postId} = req.params;

    LikeModel.findAll({where: {postId}})
        .then(likes => {

            if (req.user) {
                const userId = req.user.dataValues.id;
                const idx = likes.findIndex(like => like.userId === userId);
                res.send({likes: likes, liked: idx > -1});
            } else {
                res.send({likes: likes, liked: false});
            }
        });
});

router.post('/like', (req, res) => {
    const {postId} = req.body;
    
    if (!req.user) {
        return res.status(401).send();
    }
    
    const userId = req.user.dataValues.id;

    LikeModel.findAll({where: {postId}}).then(likes => {
        const idx = likes.findIndex(like => like.userId === userId);

        if (idx < 0) {
            LikeModel.create({userId, postId}).then(like => {
                res.send({
                    likes: [...likes, like],
                    liked: true
                });
            });
        } else {
            const like = likes[idx];
            LikeModel.destroy({where: {id: like.id}}).then(() => {
                res.send({
                    likes: likes.filter(_like => _like.id !== like.id),
                    liked: false
                });
            });
        }
    });
});

router.get('/like/:id', (req, res) => {
    LikeModel.findByPostId(req.params.id).then(like => res.send(like));
});

router.delete('/like/:id', (req, res) => {
    LikeModel.destroy({where: {id: req.params.id}}).then(id => res.send({deleted: id}));
});

module.exports = router;