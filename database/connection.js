const Sequelize = require("sequelize");
const path = require('path');

var sequelize = new Sequelize('database', 'username', 'password', {
    host: 'localhost',
    port: '8080',
    dialect: 'sqlite',// диалект базы данных. Может быть одним из следущих: 'mysql', 'mariadb', 'sqlite', 'postgres', 'mssql'.
    storage: path.join(__dirname, '../mydb')
});

sequelize.sync().then(() => {
    console.log('Connect to DB created!');
}).catch(function (err) {
    console.log('Connection error: ' + err);
});

exports.sequelize = sequelize;
exports.UserModel = require('../models/user.model')(sequelize, Sequelize);
exports.PostModel = require('../models/post.model')(sequelize, Sequelize);
exports.CommentModel = require('../models/comment.model')(sequelize, Sequelize);
exports.LikeModel = require('../models/like.model')(sequelize, Sequelize);