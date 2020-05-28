const mongoose = require('mongoose');
const {Vehicle} = require("./models/vehicle");
const {RemainderType} = require("./models/remainderType");
const {Remainder} = require("./models/remainder");
const moment = require('moment');
const config = require("./config/config");
const nodemailer = require('nodemailer');
const sgMail = require('@sendgrid/mail');
const cron = require('node-cron');



require('./connection');

let mail = config['app'].mail;
let pwd = config['app'].pwd;
let sendGridApiKey = config['app'].send_grid_key;
let sendGridSender = config['app'].send_grid_verified_sender;

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


mongoose.set("debug",true);

function getDay(noofday){
    return moment().subtract(noofday,'days').startOf('day').toISOString();
}
async function getReminderData(noofday){
    const today = moment();
    let remindert = {"single":2, "common":1};
    const todayIso = moment().startOf('day').toISOString();
    // console.log(todayIso);

    noofdaysback =  moment().add(noofday, 'days').startOf('day').toISOString();
    // {"insuranceValid":{$lt:noofdaysback}}
    try{
     let reminderData = await Remainder.find({$and: [{"expirationDate":{$gte: todayIso}}, {"isDeleted":0}]}).populate("remainderType");
    // console.log(reminderData);

    for(let i = 0; i < reminderData.length; i++){
        if(reminderData[i].remindert == 1){
            let reminderType = reminderData[i].remainderType.name;
            console.log(reminderType);
        }else{
            let reminderType = reminderData[i].remainderType.name;
            let reminderInterval = reminderData[i].remainderInterval;
            let toEmails = reminderData[i].emailList;
            let templates = reminderData[i].template;
            let subject = reminderData[i].subject;
            let veh = reminderData[i].vehicle;

            
            switch(reminderType) {
                case "Insurance":
                // sendEmail("rks@gmail.com")
                runCronJob(toEmails,templates,reminderInterval,subject,veh);
                  break;
                case "Road Tax":
                    runCronJob(toEmails,templates,reminderInterval,subject,veh);
                    break;
                default:
                  // code block
              }
            // console.log(reminderData)
        }

    }
//      let str = '';
     
//      vehicleData.forEach((item,index) => {
//         str += `
//         <tr>
//         <td>${item.name}</td>
//         <td>${item.regNo}</td>
//         <td>
//             <div style="width: 100%; border: 2px solid #f1f1f1;">
//                 <img src="${item.vehicleImage}" width="240">
//             </div>
//         </td>
//     </tr>
        
//         `;
//      });
//      let mailhtml = `
//      <header>
//      <h3>Insurance Expiry</h3>
//      <h5>Insurance is going to expire for these vehicles</h5>
//  </header>
//  <table id="customers"> 
//      <thead>
//          <tr>
//              <th>Name</th>
//              <th>Registration No</th>
//              <th>Image</th>
//          </tr>
//      </thead>
//      <tbody>
//         ${str};
//      </tbody>
//  </table>
//  <footer>
//      <p>This mail send by <a href="#">Logistic</a></p>
//  </footer>

     
//      `;

    //  const mailOptions = {
    //     from: mail, // sender address
    //     to: cron_to_email, // list of receivers
    //     subject: 'Vehicle Insurance Expiry', // Subject line
    //     html:mailhtml// plain text body
    //   };

    // transporter.sendMail(mailOptions, function (err, info) {
    //     if(err)
    //       console.log(err)
    //     else
    //       console.log(info);
    // });

    //  console.log(vehicleData);
    }catch(error){
        console.log(error);
    }
   
}


function runCronJob(emails,template,interv,subject,veh){
    // let emails = ["rajesh.patelp3034@gmail.com","raazpatel03@gmail.com"];
    cron.schedule(`*0 */${interv} * * *`, () => {
        sendEmailSendGrid(emails,subject,template)
    });

  
}

// function sendEmail(email){
//   let ems = ["rajesh.patelp3034@gmail.com","raazpatel03@gmail.com"]
//    for(let i=0;i<ems.length;i++){

//     const mailOptions = {
//         from: "tms.digitechocean@gmail.com", // sender address
//         to: ems[i], // list of receivers
//         subject: 'Vehicle Insurance Expiry', // Subject line
//         html:"mail testing"// plain text body
//     };

//     transporter.sendMail(mailOptions, function (err, info) {
//         if(err)
//           console.log(err)
//         else
//           console.log(info);
//     });

//    }
// }

function getVehicleData(vehId){

}

function sendEmailSendGrid(emails, subject,template){
    sgMail.setApiKey(sendGridApiKey);
    const msg = {
    to: emails,
    from: sendGridSender,
    subject: subject,
    html: template,
    };
    sgMail.send(msg).then((result)=>console.log(result)).catch(error => console.log(error.response.body));

}
getReminderData();



