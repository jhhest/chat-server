const express = require('express')

const app = express()

const port = 4000

function onListen() {
console.log(`listening on:${port}`)
}

app.listen(port, onListen)
