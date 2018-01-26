const path = require('path');

const express = require('express');
const router = express.Router();
const passport = require('passport');
const bcrypt = require('bcrypt-nodejs');

const { UserModel, PostModel, CommentModel, LikeModel } = require('../database/connection');

// получения списка юзеров
router.get('/user', (req, res) => {
    UserModel.findAll().then(users => res.send(users));
});

router.get('/user/me', (req, res) => {
    res.send(req.user || null);
});

//получение юзера по id;
router.get('/user/:id', (req, res) => {
    UserModel.findById(req.params.id).then(users => res.send(users));
});

router.post("/signup", (req, res, next) => {
    const {username, password} = req.body;
    
    UserModel.findOne({where: {username: username}}).then(user => {
        if(!user){
            UserModel.create({
                username: username,
                password: bcrypt.hashSync(password)
            }).then(user => {
                passport.authenticate("local", {
                    failureRedirect:"/signup", successRedirect: "/layout"
                })(req, res, next);
            })
        } else {
            res.send("user exists")
        }
    });
});

// router.post("/signin", passport.authenticate('local', {
//     failureRedirect:  '/signin',
//     successRedirect: '/layout'
// }));
router.post('/signin', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            return next(err);
        }

        if (!user) {
            return res.redirect('/signin');
        }

        req.logIn(user, err => {
            if (err) {
                return next(err);
            }

            return res.redirect('/layout');
        });
    })(req, res, next);
});

router.post('/signout', (req, res) => {
    if (!req.user) {
        return res.status(401).send();
    }
    req.logout();
    req.session.destroy();
    res.send('');
});


module.exports = router;