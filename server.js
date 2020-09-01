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
server.get('/teachers', function(req, res) {
    return res.render("teachers/index");
})

server.post('/teachers', function(req,res) {
    return res.send('Teste');
})

server.get('/teachers/create', function(req, res) {
    return res.render("teachers/create");
})