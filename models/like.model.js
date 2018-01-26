module.exports = function(sequelize, DataTypes) {
    return sequelize.define('likes', {
        userId: {
            type: DataTypes.INTEGER,
            required: true
        },
        postId: {
            type: DataTypes.INTEGER,
            required: true
        }
    });
};