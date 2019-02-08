const express = require('express')
const Sequelize = require('sequelize')
const bodyParser = require('body-parser')

const connectionString = process.env.DATABASE_URL || 'postgres://postgres:secret@localhost:5432/postgres'
const sequelize = new Sequelize(connectionString, {define: { timestamps: false }})

const app = express()
app.listen(4001, () => console.log('Express API listening on port 4001'))

// const sequelize = new Sequelize('postgres://postgres:secret@localhost:5432/postgres', { define: { timestamps: false } })
// const port = 4000
// app.listen(process.env.PORT || port, () => `Listening on port ${port}`)
// console.log("my process env port is", process.env.PORT)



// SEQUELIZE CONSTANT
const Playlist = sequelize.define('playlist', {
    playlist: Sequelize.STRING
}, {
        tableName: 'playlists'
    })

Playlist.sync()

// // GET ALL HOUSES
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

// // GET ONE HOUSE
app.get('/playlists/:id', function (req, res, next) {
    const id = req.params.id
    Playlist.findById(id)
        .then(playlists => {
            res.json({ message: `Read playlist ${id}`, playlists })
        })
})

// //POST
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

// // DELETE
app.delete('/playlists/:id', function (req, res) {
    const id = req.params.id
    Playlist.findById(id)
        .then(playlist => playlist.destroy(id)
            .then(playlist => res.status(200).json(playlist))
            .then(playlist => console.log(`The playlist with ID ${playlist.id} has now been deleted!`)))
})

// House.create({
//     title: 'Multi Million Estate',
//     address: 'This was build by a super-duper rich programmer',
//     size: 1235,
//     price: 98400000
// }).then(house => console.log(`The house is now created. The ID = ${house.id}`))

// // PUT
// app.put('/houses/:id', function (req, res) {
//     const id = req.params.id
//     House.findById(id)
//         .then(house => house.update({
//             title: 'Super Duper Million Dollar Mainson'
//         })
//             .then(house => res.status(200).json(house))
//             .then(house2 => console.log(`The house with ID ${house2.id} is now updated`, house2.values)))
// })

