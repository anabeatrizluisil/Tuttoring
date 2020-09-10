const fs = require('fs');
const data = require('./data.json');

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

        return res.redirect('/teachers');
    })

}

// show teacher
exports.show = function(req, res) {
    const { id } = req.params;

    const foundTeacher = data.teachers.find(function(teacher) {
        return teacher.id == id;
    })

    if (!foundTeacher) return res.send('Teacher not found');

    return res.send(foundTeacher);
}