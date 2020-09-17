const fs = require('fs');
const data = require('../data.json');
const Intl = require('intl');
const { age, gradutation, date } = require('../utils');

// form
exports.create = function(req, res) {
    return res.render("students/create");
}

// create student
exports.post = function(req,res) {
    // returns object properties (ex: avatar_url, name) in an array
    keys = Object.keys(req.body);

    for (key of keys) {
        if (req.body[key] == "") {
            return res.send('Preencha todos os campos!');
        }
    }

    let { avatar_url, name, birth, email, school_year, workload } = req.body;

    let id = 1;
    const lastStudent = data.students[data.students.length - 1];

    if (lastStudent) {
        id = lastStudent.id + 1;
    }
    // changes the date to ms since 1970
    birth = Date.parse(birth);

    

    // updates array whenever a new student signs up
    data.students.push({ 
        id,
        avatar_url, 
        name, 
        birth, 
        email, 
        school_year, 
        workload
    });

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err) {
        if (err) return res.send('Write file error!');

        return res.redirect(`/students/${id}`);
    })

}

// show student
exports.show = function(req, res) {
    const { id } = req.params;

    const foundStudent = data.students.find(function(student) {
        return student.id == id;
    })

    if (!foundStudent) return res.send('Student not found');

    const student = {
        ...foundStudent,
        age: age(foundStudent.birth)
    }

    return res.render('students/show', { student: student });
}

// edit student
exports.edit = function(req, res) {
    const { id } = req.params;

    const foundStudent = data.students.find(function(student) {
        return student.id == id;
    })

    if (!foundStudent) return res.send('Student not found');

    const student = {
        ...foundStudent,
        birth: date(foundStudent.birth)
    }

    return res.render('students/edit', { student: student });
}

// update a student
exports.put = function(req, res) {
    const { id } = req.body;
    let index = 0;

    const foundStudent = data.students.find(function(student, foundIndex) {
        if (student.id == id) {
            index = foundIndex;
            return true;
        }
    })

    if (!foundStudent) return res.send('Student not found');

    const student = {
        ...foundStudent,
        ...req.body,
        birth: Date.parse(req.body.birth),
        id: Number(req.body.id)
    }

    data.students[index] = student;

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err) {
        if (err) return res.send("Write error!");

        return res.redirect(`/students/${id}`);
    })


}

// delete a student
exports.delete = function(req, res) {
    const { id } = req.body;

    const filteredStudents = data.students.filter(function(student) {
        return student.id != id
    })

    data.students = filteredStudents;

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
        if (err) return res.send("Write file error!");

        return res.redirect('/students');
    })
}

// show table
exports.index = function(req, res) {
    
    return res.render("students/index", {students: data.students });
}