const express = require('express');
const routes = express.Router();
const teachers = require('./teachers');
const { Router } = require('express');

// rendering a page
routes.get('/', function(req, res) {
    return res.redirect("/teachers");
})

routes.get('/teachers', function(req, res) {
    return res.render("teachers/index");
})

routes.post('/teachers', teachers.post);

routes.get('/teachers/:id', teachers.show);

routes.get('/teachers/create', function(req, res) {
    return res.render("teachers/create");
})

module.exports = routes