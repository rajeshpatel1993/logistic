const DocumentProofModel = require('../models/documentProofModel');

const documentProofRouter = (app) => {
    app.post('/addDocumentProof', (req, res) => {
        const documentProof = new DocumentProofModel(req.body);
        documentProof.save((err,resource) => {
            if(err) {
                res.send(err).status(501);
            } else {
                res.json(resource).status(200);
            }
        })
    });

    app.get('/getAllCountries', (req, res) => {
        DocumentProofModel.find({}, (err,resource) => {
            if(err) {
                res.send(err).status(501);
            } else {
                console.log(resource);
                res.send(resource).status(200);
            }
        });
    });

    app.post('/deleteDocumentProof', (req, res) => {
        const documentProofId = req.body.documentProofId;
        EmployeeModel.findOneAndDelete({ documentProofId }, (err, response) => {
            if(err) {
                res.send(err).status(501);
            } else {
                console.log(response);
                res.send(response).status(200);
            }
        })
    })
}

module.exports = documentProofRouter;