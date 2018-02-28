var express = require('express')
var app = express()

var bodyparser = require('body-parser')
var urlencodedparser = bodyparser.urlencoded({ extended: false })
var path = require('path')

app.use('/assets', express.static(__dirname + '/public'))

app.get('/', function(req, res){
    res.sendFile(path.join(__dirname + '/index.html'))
})

app.post('/', function(req, res){
    console.log('bodyyyy === ', req.body)
})

app.listen(1234)

console.log('Listening on :1234')