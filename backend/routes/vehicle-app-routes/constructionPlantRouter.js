const constructionPlantModel = require('../models/constructionPlantModel');
const uuid = require('uuid/v4');

const constructionPlantRouter = (app) => {
    app.post('/addConstructionPlant', (req, res) => {
        const constructionPlantList = req.body.constructionPlantList;
        const withId = constructionPlantList.map((constructionPlant) => ({ constructionPlantId: uuid, constructionPlant }))
        ConstructionPlantModel.insertMany(withId, (err, resource) => {
            if (err) {
                res.send(err).status(501);
            } else {
                res.json(resource).status(200);
            }
        });
    });

    app.get('/getConstructionPlantList', (req, res) => {
        ConstructionPlantModel.find({}, (err, resource) => {
            if (err) {
                res.send(err).status(501);
            } else {
                console.log(resource);
                res.send(resource).status(200);
            }
        });
    });
}

/**
     * @param constructionPlantId String
     * ConstructionPlant Id needs to be passed in request body for deleting
     */
app.post('/deleteConstructionPlant', (req, res) => {
    const constructionPlantId = req.body.constructionPlantId;
    ConstructionPlantModel.findOneAndDelete({ constructionPlantID: constructionPlantId }, (err, response) => {
        if (err) {
            res.send(err).status(501);
        } else {
            console.log(response);
            res.send(response).status(200);
        }
    })
})

app.post('/updateConstructionPlant', (req, res) => {
    const constructionPlantId = req.body.constructionPlantId;
    const modifiedConstructionPlant = req.body.constructionPlant;
    ConstructionPlantModel.findOneAndUpdate({ constructionPlantID: constructionPlantId }, { ...modifiedConstructionPlant }, (err, response) => {
        if (err) {
            res.send(err).status(501);
        } else {
            console.log(response);
            res.send(response).status(200);
        }
    })
});

module.exports = constructionPlantRouter;