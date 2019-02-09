const Sequelize = require('sequelize')
const sequelize = require('../db')
const User = require('../users/model')

const Playlist = sequelize.define('playlist', {
    name: Sequelize.STRING,
    userId: {
        type: Sequelize.INTEGER,
        field: 'user_id',
        allowNull: true,
    }
}, {
        tableName: 'playlists',
    })

Playlist.belongsTo(User);

module.exports = Playlist