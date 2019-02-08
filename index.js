const express = require('express')
const Sequelize = require('sequelize')
const bodyParser = require('body-parser')

const connectionString = process.env.DATABASE_URL || 'postgres://postgres:secret@localhost:5432/postgres'
const sequelize = new Sequelize(connectionString, { define: { timestamps: false } })

const app = express()
app.listen(4001, () => console.log('Express API listening on port 4001'))

// const sequelize = new Sequelize('postgres://postgres:secret@localhost:5432/postgres', { define: { timestamps: false } })
// const port = 4000
// app.listen(process.env.PORT || port, () => `Listening on port ${port}`)
// console.log("my process env port is", process.env.PORT)

sequelize.define('playlists')


// PLAYLIST
const Playlist = sequelize.define('playlist', {
    name: Sequelize.STRING
}, {
        tableName: 'playlists'
    })

Playlist.sync()

// SONG
const Song = sequelize.define('songs', {
    title: Sequelize.STRING,
    artist: Sequelize.STRING,
    album: Sequelize.STRING,
    playlistId: {
        type: Sequelize.INTEGER,
        field: 'playlist_id'
    }
}, {
        tableName: 'songs'
    })

Song.sync()

Song.belongsTo(Playlist)

// // GET ALL PLAYLISTS
app.get('/playlists', function (req, res, next) {
    Playlist.findAll()
        .then(playlists => {
            res.json({ playlists: playlists })
        })
        .catch(err => {
            res.status(500).json({
                message: 'Something went wrong',
                error: err
            })
        })
})

// // GET ONE PLAYLIST
app.get('/playlists/:id', function (req, res, next) {
    const id = req.params.id
    Playlist.findById(id)
        .then(playlists => {
            res.json({ message: `Read playlist ${id}`, playlists })
        })
})

// //POST ONE PLAYLIST
app.use(bodyParser.json())

app.post('/playlists', function (req, res) {
    Playlist
        .create(req.body)
        .then(playlist => res.status(201).json(playlist))
        .catch(err => {
            res.status(500).json({
                message: 'Something went wrong',
                error: err
            })
        })
})

// // DELETE ONE PLAYLIST
app.delete('/playlists/:id', function (req, res) {
    const id = req.params.id
    Playlist.findById(id)
        .then(playlist => playlist.destroy(id)
            .then(playlist => res.status(200).json(playlist))
            .then(playlist => console.log(`The playlist with ID ${playlist.id} has now been deleted!`)))
})


// // GET ALL SONGS
app.get('/songs', function (req, res, next) {
    Song.findAll()
        .then(songs => {
            res.json({ songs: songs })
        })
        .catch(err => {
            res.status(500).json({
                message: 'Something went wrong',
                error: err
            })
        })
})

// GET ONE SONG
app.get('/songs/:id', function (req, res, next) {
    const id = req.params.id
    Song.findById(id)
        .then(songs => {
            res.json({ message: `Read playlist ${id}`, songs })
        })
})

// POST ONE SONG
app.post('/playlists/:id/songs', function (req, res) {
    Song
        .create(req.body)
        .then(song => res.status(201).json(song))
        .catch(err => {
            res.status(500).json({
                message: 'Something went wrong',
                error: err
            })
        })
})


// Song.create({
//     title: 'Ow Yeah!',
//     artist: 'Johnny Gazebo',
//     album: 'ALl Night Long',
//     playlistId: 5
// }).then(song => console.log(`The song is now created. The ID = ${song.id}`))

// Playlist.create({
//     name: 'My favourite hiphop music'
// }).then(playlist => console.log(`The playlist is now created. The ID = ${playlist.id}`))

