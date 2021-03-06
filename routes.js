const express = require('express');
const routes = express.Router();
const teachers = require('./controllers/teachers');
const students = require('./controllers/students');
const { Router } = require('express');

// rendering teachers pages
routes.get('/', function(req, res) {
    return res.redirect("/teachers");
});

routes.get('/teachers', teachers.index);
routes.get('/teachers/create', teachers.create);
routes.post('/teachers', teachers.post);
routes.get('/teachers/:id', teachers.show);
routes.delete('/teachers', teachers.delete);
routes.get('/teachers/:id/edit', teachers.edit);
routes.put('/teachers', teachers.put);


// rendering students page
routes.get('/students', students.index);
routes.get('/students/create', students.create);
routes.post('/students', students.post);
routes.get('/students/:id', students.show);
routes.delete('/students', students.delete);
routes.get('/students/:id/edit', students.edit);
routes.put('/students', students.put);


module.exports = routes