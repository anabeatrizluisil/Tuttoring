const express = require('express');
const nunjucks = require('nunjucks');
const server = express();

// setting njk as view engine
server.set('view engine', 'njk');

//configuring nunjucks
nunjucks.configure("views", {
    express: server,
    autoescape: false,
    noCache: true
});

server.use(express.static('public'));

// activating server
server.listen(5000, function() {
    console.log('server is running!');
})

// rendering a page
server.get('/', function(req, res) {
    res.render("index");
})