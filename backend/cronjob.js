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
    const today = moment();
    const todayIso = moment().startOf('day').toISOString();
    noofdaysback =  moment().add(noofday, 'days').startOf('day').toISOString();
    // {"insuranceValid":{$lt:noofdaysback}}
    try{
     let vehicleData = await Vehicle.find({"roadTaxValid":{$gte:todayIso, $lt:noofdaysback}}).limit(1);
     
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
     <h3>Road Tax Expiry</h3>
     <h5>Road Tax is going to expire for these vehicles</h5>
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
        subject: 'Vehicle Road Tax Expiry', // Subject line
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


// async function getVehicleDataByWarranty(noofday){

    

// }

let noofdaybeforeRoadTaxExpiry = 5;
let noofdaybeforeInsuranceExpiry = 5;
let noofdaybeforeWarranty = 5;
getVehicleDataByInsuranceExpiry(noofdaybeforeInsuranceExpiry);
getVehicleDataByRoadTaxExpiry(noofdaybeforeRoadTaxExpiry);
// getVehicleDataByWarranty(noofdaybeforeWarranty);

