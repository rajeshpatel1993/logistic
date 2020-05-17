/* const TitleModel = require('../models/titleModel'); */
const uuid = require('uuid/v4');

const titleRouter = (app) => {
    /* app.post('/addTitle', (req, res) => {
        const titleList = req.body.titleList;
        const withId = titleList.map((title) => ({ titleId: uuid, title}))
        TitleModel.insertMany(withId, (err,resource) => {
            if(err) {
                res.send(err).status(501);
            } else {
                res.json(resource).status(200);
            }
        });
    });

    app.get('/getTitleList', (req, res) => {
        TitleModel.find({}, (err,resource) => {
            if(err) {
                res.send(err).status(501);
            } else {
                console.log(resource);
                res.send(resource).status(200);
            }
        });
    });
 */
    return app;
}

module.exports = titleRouter;