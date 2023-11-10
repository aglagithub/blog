const { DataTypes } = require('sequelize');
const { db } = require('../database/config');

const Comment = db.define('comments', {
    id: {
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
        type: DataTypes.INTEGER,
    },
    text: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },

    postId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    status: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
    },
});

//Objeto
/* const postStatus = Object.freeze({
    active: 'active',
    disabled: 'disabled'
}); */

module.exports = Comment;