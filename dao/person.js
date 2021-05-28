const db = require('../db/db'); //this could be confusing but remember we created a db.js inside of route /db

class PersonDAO {
    async createPerson(firstName, lastName, email) {
        const [id] = await db('person').insert({
            email,
            first_name: firstName,
            last_name: lastName
        })
        .returning('id');

        return id;
    }
}

module.exports = new PersonDAO();