const aws = require("aws-sdk");
const fs  = require("fs");

module.exports.upload = async (req, res)  => {

    aws.config.setPromisesDependency();
    aws.config.update({
      accessKeyId: process.env.ACCESSKEYID,
      secretAccessKey: process.env.SECRETACCESSKEY,
      region: process.env.REGION
    });
    const s3 = new aws.S3();
    const file = req.files;

    const uploadedFileData = [];
try{
    file.map(async (item) => {
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
        }
    });
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
