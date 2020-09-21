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

        return {
            day,
            month,
            year,
            iso: `${year}-${month}-${day}`,
            birthDay: `${day}/${month}`
        };
    },
    grade: function (grade) {
        switch (grade) {
            case '5EF':
                return "5º ano do Ensino Fundamental";
            case '6EF':
                return "6º ano do Ensino Fundamental";
            case '7EF': 
                return "7º ano do Ensino Fundamental";
            case '8EF':
                return "8º ano do Ensino Fundamental";
            case '9EF':
                return "9º ano do Ensino Fundamental";
            case '1EM':
                return "Primeiro ano do Ensino Médio";
            case '2EM':
                return "Segundo ano do Ensino Médio";
            case '3EM':
                return "Terceiro ano do Ensino Médio";    
        }
    }
}