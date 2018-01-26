module.exports = function(sequelize, DataTypes) {
    return sequelize.define('posts', {
        title: {
            type: DataTypes.TEXT,
            required: true
        },
        body: {
            type: DataTypes.TEXT,
            required: true
        },
        userId: {
            type: DataTypes.TEXT,
            required: true
        },
        author: {
            type: DataTypes.TEXT,
            required: true
        }
    });
};