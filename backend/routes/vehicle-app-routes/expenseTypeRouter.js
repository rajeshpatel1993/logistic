const expenseTypeModel = require('../models/expenseTypeModel');

const expenseTypeRouter = (app) => {
    app.post('/addExpenseType', (req, res) => {
        const expenseType = new ExpenseTypeModel(req.body);
        ExpenseTypeModel.save((err,resource) => {
            if(err) {
                res.send(err).status(501);
            } else {
                res.json(resource).status(200);
            }
        })
    });

    app.get('/getAllExpenseType', (req, res) => {
        ExpenseTypeModel.find({}, (err,resource) => {
            if(err) {
                res.send(err).status(501);
            } else {
                console.log(resource);
                res.send(resource).status(200);
            }
        });
    });

    app.post('/deleteExpenseType', (req, res) => {
        const expenseTypeId = req.body.expenseTypeId;
        ExpenseTypeModel.findOneAndDelete({ expenseTypeId }, (err, response) => {
            if(err) {
                res.send(err).status(501);
            } else {
                console.log(response);
                res.send(response).status(200);
            }
        })
    })
}

module.exports = expenseTypeRouter;