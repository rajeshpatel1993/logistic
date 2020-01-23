const aws = require("aws-sdk");
const fs  = require("fs");
const config = require("../config/config");
module.exports.upload = async (req, res, next)  => {

    aws.config.setPromisesDependency();
    aws.config.update({
      accessKeyId: config['aws'].accessKeyId,
      secretAccessKey: config['aws'].secretAccessKey
    });
    const s3 = new aws.S3();
    const file = req.files;
    let lengthofFile = file.length;
  

    const uploadedFileData = [];
try{
    file.map(async (item, index) => {
        const params = {
          Bucket: "logistic-management",
          Body: fs.createReadStream(item.path),
          Key: `files/${item.originalname}`
        };

        let data = await s3.upload(params).promise();
        if (data) {
                    fs.unlinkSync(item.path); // Empty temp folder
                    const locationUrl = data.Location;
                    uploadedFileData.push(locationUrl);

                    if(index == 1){
                      req.uploadedFiles = uploadedFileData;
                      next();
                    }
                    // console.log("test");
        }
    });
// console.log(uploadedFileData);



    //     , (err, data) => {
    //       if (err) {
    //         console.log('Error occured while trying to upload to S3 bucket', err);
    //       }

    //       if (data) {
    //         fs.unlinkSync(item.path); // Empty temp folder
    //         const locationUrl = data.Location;
    //         uploadedFileData.push(locationUrl);
    //         console.log(locationUrl);
    //         // let newUser = new Users({ ...req.body, avatar: locationUrl });
    //         // newUser
    //         //   .save()
    //         //   .then(user => {
    //         //     res.json({ message: 'User created successfully', user });
    //         //   })
    //         //   .catch(err => {
    //         //     console.log('Error occured while trying to save to DB');
    //         //   });
    //       }
    //     });
    // });
   


}catch(error){

}

    // console.log()

    
   
  }
