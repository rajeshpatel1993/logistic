const NotesModel = require('../models/notesModel');
const uuid = require('uuid/v4');

const notesRouter = (app) => {
    app.post('/addNotes', (req, res) => {
        const newNote = new NotesModel(req.body.notes);
        NotesModel.save(newNote, (err,resource) => {
            if(err) {
                res.send(err).status(501);
            } else {
                res.json(resource).status(200);
            }
        });
    });

    app.get('/getAllNotes', (req, res) => {
        NotesModel.find({}, (err,resource) => {
            if(err) {
                res.send(err).status(501);
            } else {
                console.log(resource);
                res.send(resource).status(200);
            }
        });
    });

    app.get('/getNotesByEmployeeId', (req, res) => {
        const employeeId = req.query.employeeId;
        NotesModel.find({empID: employeeId}, (err, resource) => {
            if(err) {
                res.send(err).status(501);
            } else {
                console.log(resource);
                res.send(resource).status(200);
            }
        })
    })

    return app;
}

module.exports = notesRouter;