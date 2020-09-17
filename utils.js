module.exports = {
    age: function(timestamp) {
        var today = new Date();
        var birthDate = new Date(timestamp);
        var age = today.getFullYear() - birthDate.getFullYear();
        var month = today.getMonth() - birthDate.getMonth();

        if (month < 0 || (month === 0) && today.getDate() < birthDate.getDate()) {
            age = age - 1;
        }

        return age;
    },
    gradutation: function(select) {
        switch (select) {
            case 'Ensino Médio':
                return "Ensino Médio Completo";
            case 'Ensino Superior':
                return "Ensino Superior Completo";
            case 'mestrado': 
                return "Mestrado";
            case 'doutorado':
                return "Doutorado";
        }
    },
    date: function(timestamp) {
        const date = new Date(timestamp);

        const year = date.getUTCFullYear();
        const month = `0${date.getUTCMonth() + 1}`.slice(-2);
        const day = `0${date.getUTCDate()}`.slice(-2);

        return `${year}-${month}-${day}`;
    }
}