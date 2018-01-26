module.exports = function(sequelize, DataTypes) {
    return sequelize.define('users', {
        username: {
            type: DataTypes.TEXT,
            unique: true,
            required: true
        },
        password: {
            type: DataTypes.TEXT,
            required: true
        }
    });
};