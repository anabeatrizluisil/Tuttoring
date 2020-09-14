const express = require('express');
const routes = express.Router();
const teachers = require('./teachers');
const { Router } = require('express');

// rendering a page
routes.get('/', function(req, res) {
    return res.redirect("/teachers");
})
routes.get('/teachers', teachers.index);

routes.get('/teachers/create', function(req, res) {
    return res.render("teachers/create");
})

routes.post('/teachers', teachers.post);
routes.get('/teachers/:id', teachers.show);
routes.delete('/teachers', teachers.delete);
routes.get('/teachers/:id/edit', teachers.edit);
routes.put('/teachers', teachers.put);


module.exports = routes