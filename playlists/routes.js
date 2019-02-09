const { Router } = require('express')
const Playlist = require('./model')
const auth = require('../auth/middleware')

const router = new Router()

// GET ALL PLAYLISTS
router.get('/playlists', auth, function (req, res, next) {

    Playlist.findAll({
        where: {
            userId: req.user.id
        }
    })
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

// GET ONE PLAYLIST
router.get('/playlists/:id', auth, function (req, res, next) {
    Playlist.findAll({
        where: {
            userId: req.user.id,
            id: req.params.id
        }
    })
        .then(playlists => {
            if (playlists.length < 1) {
                return res.status(404).json({
                    message: `Playlist ${req.params.id} not found`
                })
            }
            res.json({ message: `Read playlist ${req.params.id}`, playlist: playlists[0] })
        })
})

// POST ONE PLAYLIST
router.post('/playlists', auth, function (req, res) {
    const data = req.body;
    data.userId = req.user.id;
    Playlist
        .create(data)
        .then(playlist => res.status(201).json(playlist))
        .catch(err => {
            res.status(500).json({
                message: 'Something went wrong',
                error: err
            })
        })
})

// DELETE ONE PLAYLIST
router.delete('/playlists/:id', auth, function (req, res) {

    Playlist.destroy({
        where: {
            userId: req.user.id,
            id: req.params.id
        }
    }).then(affectedRows => {
        res.status(204).json({});
    }).catch(err => {
        res.status(500).json({
            message: 'Something went wrong',
            error: err
        })
    });
})

module.exports = router