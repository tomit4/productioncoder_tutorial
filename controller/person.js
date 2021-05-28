const personService = require('../service/person');

class PersonController {
    async createPerson(req, res) {
        try {
            const id = await personService.createPerson(req.body);
            res.status(201).json(id);
        } catch (err) {
            console.error(err); // don't use console.error() because it's not async
            res.status(500).json('something went wrong'); // strangely enough this error handler helped us finish this project,
            // it showed up in Postman because we tried to post 'John' twice.
        }
    }
}

module.exports = new PersonController();