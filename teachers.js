const fs = require('fs');
const data = require('./data.json');
const Intl = require('intl');
const { age, gradutation, date } = require('./utils');

// create teacher
exports.post = function(req,res) {
    // returns object properties (ex: avatar_url, name) in an array
    keys = Object.keys(req.body);

    for (key of keys) {
        if (req.body[key] == "") {
            return res.send('Preencha todos os campos!');
        }
    }

    let { avatar_url, name, birth, select, type, field} = req.body;

    // creates a new key called created_at
    const created_at = Date.now();
    // creates a new key called id
    const id = Number(data.teachers.length + 1);
    // changes the date to ms since 1970
    birth = Date.parse(birth);

    

    // updates array whenever a new teacher signs up
    data.teachers.push({ 
        id,
        avatar_url, 
        name, 
        birth, 
        select, 
        type, 
        field, 
        created_at});

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err) {
        if (err) return res.send('Write file error!');

        return res.redirect(`/teachers/${id}`);
    })

}

// show teacher
exports.show = function(req, res) {
    const { id } = req.params;

    const foundTeacher = data.teachers.find(function(teacher) {
        return teacher.id == id;
    })

    if (!foundTeacher) return res.send('Teacher not found');

    const teacher = {
        ...foundTeacher,
        age: age(foundTeacher.birth),
        gender: "",
        field: foundTeacher.field.split(","),
        select: gradutation(foundTeacher.select),
        created_at: new Intl.DateTimeFormat("pt-BR").format(foundTeacher.created_at)
    }

    return res.render('teachers/show', { teacher: teacher });
}

// edit teacher
exports.edit = function(req, res) {
    const { id } = req.params;

    const foundTeacher = data.teachers.find(function(teacher) {
        return teacher.id == id;
    })

    if (!foundTeacher) return res.send('Teacher not found');

    const teacher = {
        ...foundTeacher,
        birth: date(foundTeacher.birth)
    }

    return res.render('teachers/edit', { teacher: teacher});
}

// update a teacher
exports.put = function(req, res) {
    const { id } = req.body;
    let index = 0;

    const foundTeacher = data.teachers.find(function(teacher, foundIndex) {
        if (teacher.id == id) {
            index = foundIndex;
            return true;
        }
    })

    if (!foundTeacher) return res.send('Teacher not found');

    const teacher = {
        ...foundTeacher,
        ...req.body,
        birth: Date.parse(req.body.birth)
    }

    data.teachers[index] = teacher;

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err) {
        if (err) return res.send("Write error!");

        return res.redirect(`/teachers/${id}`);
    })


}

// delete a teacher
exports.delete = function(req, res) {
    const { id } = req.body;

    const filteredTeachers = data.teachers.filter(function(teacher) {
        return teacher.id != id
    })

    data.teachers = filteredTeachers;

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
        if (err) return res.send("Write file error!");

        return res.redirect('/teachers');
    })
}