const Sequelize = require('sequelize')
const sequelize = require('../db')
const Playlist = require('../playlists/model')

const Song = sequelize.define('songs', {
    title: Sequelize.STRING,
    artist: Sequelize.STRING,
    album: Sequelize.STRING,
    playlistId: {
        type: Sequelize.INTEGER,
        field: 'user_id',
        allowNull: true,
    }
}, {
        tableName: 'songs'
    })

Song.belongsTo(Playlist)

module.exports = Song