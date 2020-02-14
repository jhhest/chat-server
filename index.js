const express = require('express')
const messageRouter = require(
  './message/router'
)

const app = express ()

const port = 4000

function onListen () {
  console.log(`Listening on :${port}`)
}

const jsonMiddleware = express
  .json()
app.use(jsonMiddleware)

app.use(messageRouter)

app.listen(port, onListen)
