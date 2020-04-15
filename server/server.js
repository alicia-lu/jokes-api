const path = require('path')
const express = require('express')
const request = require('superagent')

const server = express()

server.use(express.json())
server.use(express.static(path.join(__dirname, './public')))

const apiUrl = 'https://official-joke-api.appspot.com/jokes/random'


//GET /api/v1/author
server.get('/api/v1/joke', (req, res) => {
  // Test with just this line: 
  // res.json({joke: "testing"})
  // //then:
  request.get(apiUrl)
    .then(apiRes => {
      const { type, setup, punchline } = apiRes.body
      res.json({type, setup, punchline})
    })
})


module.exports = server
