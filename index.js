const express = require('express')
const bodyParser = require('body-parser')
const songsRouter = require('./songs/routes')
const playlistsRouter = require('./playlists/routes')
const jwtRouter = require('./auth/routes')
const usersRouter = require('./users/routes')

const app = express()
const port = process.env.PORT || 4001

app.get('/do-something', (request, response) => {
  console.log(`I'll do something, I promise!`)
  response.end()
})

app
  .use(bodyParser.json())
  .use(songsRouter)
  .use(playlistsRouter)
  .use(jwtRouter)
  .use(usersRouter)
  .listen(port, () => console.log(`Listening on port ${port}`))

