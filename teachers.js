// create teacher
exports.post = function(req,res) {
    // returns object properties (ex: avatar_url, name) in an array
    keys = Object.keys(req.body);

    for (key of keys) {
        if (req.body[key] == "") {
            return res.send('Preencha todos os campos!');
        }
    }

    return res.send(req.body);
}