const bloodGroupModel = require('../models/bloodGroupModel');
const titleModel = require('../models/titleModel');
const countryModel = require('../models/countryModel');
const stateModel = require('../models/stateModel');
const genderModel = require('../models/genderModel');
const jobTitleModel = require('../models/jobTitleModel');
const martialModule = require('../models/martialStatus');
const nationalityModel = require('../models/nationalityModel');
const religionModel = require('../models/religionModel');
const workLocationModel = require('../models/workLocationModel');
const projectTypeModel = require('../models/projectTypeModel');
const projectModel = require('../models/projectModel');
const employeeStausModel = require('../models/employeeStatusModel');;
const employmentStatusModel = require('../models/employmentStatusModel')

const demographicsRouter = (app) => {
    app.get('/data', (req, res) => {
        const organizationId = req.query.organizationId;
        if(organizationId) {
            const promises = [];
            promises.push(bloodGroupModel.find({ organizationId }));
            promises.push(titleModel.find({ organizationId }));
            promises.push(countryModel.find({ organizationId }));
            promises.push(stateModel.find({ organizationId }));
            promises.push(genderModel.find({ organizationId }));
            promises.push(jobTitleModel.find({ organizationId }));
            promises.push(martialModule.find({ organizationId }));
            promises.push(nationalityModel.find({ organizationId }));
            promises.push(religionModel.find({ organizationId }));
            promises.push(workLocationModel.find({ organizationId }));
            promises.push(employeeStausModel.find({ organizationId }));
            promises.push(employmentStatusModel.find({ organizationId }))
            /**TODO: Remove the below promises if required*/
            promises.push(projectTypeModel.find({ organizationId }));
            promises.push(projectModel.find({ organizationId }));
            Promise.all(promises).then((values) => {
                const returnObject = {
                    bloodGroups: values[0],
                    titles: values[1],
                    countries: values[2],
                    states: values[3],
                    gender: values[4],
                    jobTitles: values[5],
                    martialStatus: values[6],
                    nationalities: values[7],
                    religions: values[8],
                    workLocations: values[9],
                    employeeStatus: values[10],
                    employmentStatus: values[11],
                    projectTypes: values[12],
                    projects: values[13]
                }
                res.json({ message: 'success', data: returnObject}).status(200);
            }).catch((err) => {
                res.json({ message: 'Something Bad Happened'}).status(503);
            })
        } else {
            res.json({ message: 'Organization Id not Provided'}).status(403);
        }
        
    })
    return app;
}

module.exports = demographicsRouter;