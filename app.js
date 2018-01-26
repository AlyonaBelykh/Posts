const path = require('path');

const express = require('express');
const app = express();

const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');
const bcrypt = require('bcrypt-nodejs');

const IndexRoutes = require('./routes/index.routes');
const UserRoutes = require('./routes/user.routes');
const PostRoutes = require('./routes/post.routes');
const LikeRoutes = require('./routes/like.routes');
const CommentRoutes = require('./routes/comments.routes');

const { UserModel } = require('./database/connection');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(function(req,res,next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept" );
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    next();
});

passport.use(new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password'
}, (username, password, done) => {
    const hashedPass = bcrypt.hashSync(password);
    UserModel.findOne({where: {username: username}}).then((user, err) => {
        if (err) {
            return done(err);
        }
        
        if (!user) {
            return done(null, false);
        }

        if (!bcrypt.compareSync(password, user.password)) {
            return done(null, false);
        }

        return done(null, user);
    });
}));

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    UserModel.findById(id)
        .then(user => done(null, user));
});

app.use(session({
    secret: 'secret',
    saveUninitialized: true,
    resave: true
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/', IndexRoutes);
app.use('/api', UserRoutes);
app.use('/api', PostRoutes);
app.use('/api', LikeRoutes);
app.use('/api', CommentRoutes);

// catch 404 and forward to error handler
app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
/*app.use((err, req, res, next) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    res.status(err.status || 500).send('ERROR');
});*/

module.exports = app;
