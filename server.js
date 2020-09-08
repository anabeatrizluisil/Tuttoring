const express = require('express');
const nunjucks = require('nunjucks');
const routes = require('./routes');
const server = express();

// setting njk as view engine
server.set('view engine', 'njk');

//configuring nunjucks
nunjucks.configure("views", {
    express: server,
    autoescape: false,
    noCache: true
});

// habilita o req body
server.use(express.urlencoded({extended: true}))
server.use(express.static('public'));
server.use(routes);

// activating server
server.listen(5000, function() {
    console.log('server is running!');
})

