module.exports = function(sequelize, DataTypes) {
    return sequelize.define('comments', {
        userId: {
            type: DataTypes.TEXT,
            required: true
        },
        text: {
            type: DataTypes.TEXT,
            required: true
        },
        postId: {
            type: DataTypes.INTEGER,
            required: true
        },
        author: {
            type: DataTypes.TEXT,
            required: true
        }
    });
};