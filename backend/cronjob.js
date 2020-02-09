const mongoose = require('mongoose');
const {Vehicle} = require("./models/vehicle");
const moment = require('moment');
const config = require("./config/config");
const nodemailer = require('nodemailer');

require('./connection');

let mail = config['app'].mail;
let pwd = config['app'].pwd;
let cron_to_email = config['app'].cron_to_email;
const transporter = nodemailer.createTransport({
    service: 'gmail',
    secure: false,
    port: 25,
    auth: {
           user: mail,
           pass: pwd
       },
    tls: {
        rejectUnauthorized: false
      }
});


const setCoinP = new Set();
const coinpArr = [];

mongoose.set("debug",true);

function getDay(noofday){
    return moment().subtract(noofday,'days').startOf('day').toISOString();
}
async function getVehicleDataByInsuranceExpiry(noofday){
    const today = moment();
    const todayIso = moment().startOf('day').toISOString();
    noofdaysback =  moment().add(noofday, 'days').startOf('day').toISOString();
    // {"insuranceValid":{$lt:noofdaysback}}
    try{
     let vehicleData = await Vehicle.find({"insuranceValid":{$gte:todayIso, $lt:noofdaysback}}).limit(1);
     
     let str = '';
     
     vehicleData.forEach((item,index) => {
        str += `
        <tr>
        <td>${item.name}</td>
        <td>${item.regNo}</td>
        <td>
            <div style="width: 100%; border: 2px solid #f1f1f1;">
                <img src="${item.vehicleImage}" width="240">
            </div>
        </td>
    </tr>
        
        `;
     });
     let mailhtml = `
     <header>
     <h3>Insurance Expiry</h3>
     <h5>Insurance is going to expire for these vehicles</h5>
 </header>
 <table id="customers"> 
     <thead>
         <tr>
             <th>Name</th>
             <th>Registration No</th>
             <th>Image</th>
         </tr>
     </thead>
     <tbody>
        ${str};
     </tbody>
 </table>
 <footer>
     <p>This mail send by <a href="#">Logistic</a></p>
 </footer>

     
     `
     const mailOptions = {
        from: mail, // sender address
        to: cron_to_email, // list of receivers
        subject: 'Vehicle Insurance Expiry', // Subject line
        html:mailhtml// plain text body
      };

    transporter.sendMail(mailOptions, function (err, info) {
        if(err)
          console.log(err)
        else
          console.log(info);
    });

    //  console.log(vehicleData);
    }catch(error){
        console.log(error);
    }
   
}

async function getVehicleDataByRoadTaxExpiry(noofday){

}


async function getVehicleDataByWarranty(noofday){

}

let noofdaybeforeRoadTaxExpiry = 5;
let noofdaybeforeInsuranceExpiry = 5;
let noofdaybeforeWarranty = 5;
getVehicleDataByInsuranceExpiry(noofdaybeforeInsuranceExpiry);
getVehicleDataByRoadTaxExpiry(noofdaybeforeRoadTaxExpiry);
getVehicleDataByWarranty(noofdaybeforeWarranty);

/* changed branch */


// async function deleteData(getDat,coinpair){
//     try{
//         //  console.log(coinpair);
//         // let findData = await binanceOrderBookModel.find();
//          let deldata = await binanceOrderBookModel.deleteMany({$and: [{ "created_date" : { "$lt": getDat }}, {"data.s":coinpair}]});
//          let deldatatrade = await binanceTradeModel.deleteMany({$and: [{ "created_date" : { "$lt": getDat }}, {"data.s":coinpair}]});
//         //  console.log(findData);
//         // await mongoose.connection.db.collection('binance-trade-data').deleteMany({"created_date" : {  "$lt": new Date(getDat)}});
//     }catch(error){
//         console.log(error);
//     }
// // console.log('running');

// }


// async function listAllKeys(token, params)
// {
//   if(token) params.ContinuationToken = token;

//   let s3data = await s3.listObjectsV2(params).promise();
//   let contentsofs3 = s3data.Contents;
//   contentsofs3.forEach(item => {
//       let itemKey = item.Key;
//       let explodedItemKey = itemKey.split("/");
//       let coinp = explodedItemKey[4];
//       if(item.Size > 0 && (coinpArr.indexOf(coinp) == -1)){
//           coinpArr.push(coinp);
//       }
//   });

//   if(s3data.MaxKeys == s3data.KeyCount){
//     await listAllKeys(s3data.NextContinuationToken,params);
//   }else{
//       return coinpArr;
//   }

      
// }


// const getFileInS3 = async (pa) =>{
//     let p = pa.split("/");
//     let ystdate = p[p.length-1];
//     let typeofdata = p[2];
//     // let coinpair = p[2];
//     //  console.log(ystdate);

//     const params = {
//         Bucket: bucketname, 
//         MaxKeys: 1000,
//         Prefix: 'binance-data/new_data/'+typeofdata+"/"+ystdate+"/",
//     };
   
//     try{
//         const getDat = getDay(2);    

//         let s3data = await listAllKeys(undefined, params);
//         for(let i=0;i<coinpArr.length;i++){
//             deleteData(getDat,coinpArr[i]);
//         }
//         // console.log(coinpArr);
        
//         // const datestring1 = moment(getDat).format('YYYY-MM-DD')
//         // s3data = await s3.listObjectsV2(params).promise();
//         // let contentsofs3 = s3data.Contents;
//         // console.log(s3data);
//         // contentsofs3.forEach(item => {
//         //     let itemKey = item.Key;
//         //     let explodedItemKey = itemKey.split("/");
//         //     let coinp = explodedItemKey[4];
//         //     // console.log(coinp);
//         //     if(item.Size > 0 && (coinpArr.indexOf(coinp) == -1)){
//         //         coinpArr.push(coinp);

//         //         //  deleteData(getDat,datestring1);
//         //     }
            
           
//         // });

//         // setCoinP.add(coinpArr);
//         // console.log(coinpArr);
//         //  console.log(s3data);
//     }catch(error){
//         console.log(error);
//     }

// }



// let yesterdayDate = moment().subtract(2,("days")).format('YYYY-MM-DD');
// getFileInS3("binance-data/new_data/order-book/"+yesterdayDate);
