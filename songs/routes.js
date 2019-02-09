const { Router } = require('express')
const Song = require('./model')
const Playlist = require('../playlists/model')

const router = new Router()

// GET ALL SONGS
router.get('/songs', function (req, res, next) {
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
router.get('/songs/:id', function (req, res, next) {
    const id = req.params.id
    Song.findById(id)
        .then(songs => {
            res.json({ message: `Read playlist ${id}`, songs })
        })
})

// POST ONE SONG
router.post('/playlists/:id/songs', function (req, res) {
    if (req.body.title === song.title) {
        return res.status(400).send({
            message: `Song already exists`
        })
    }
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

module.exports = router



