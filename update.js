const { exec } = require("child_process");
const querystring = require('querystring');
const https = require("https");
require('dotenv').config();

var stopNode = 'sudo docker stop otnode'
var sysUpdate = 'sudo apt update && sudo apt upgrade -y && sudo apt autoremove -y'
var reboot = 'sudo reboot'
var updateCheck = "sudo docker logs --since 30m otnode | grep 'Update ready'"
var biddingCheck = "sudo docker logs --since 10m otnode | grep 'Replication finished for offer'"

function PushNotification(PushTitle, PushText)
    {
             var apiKey = process.env.APIKEY
             var postdata = querystring.stringify({
                     'ApiKey': apiKey,
                     'PushTitle': PushTitle,
                     'PushText': PushText,
                     });
                     var options = {
                     hostname: 'www.notifymydevice.com',
                     port: 443,
                     path: '/push?',
                     method: 'POST',
                     headers: {
                     'Content-Type': 'application/x-www-form-urlencoded',
                     'Content-Length': postdata.length
                     }
             };

     callback = function (response) {
             var str = '';
                     //another chunk of data has been recieved, so append it to `str`
                             response.on('data', function (chunk) {
                             str += chunk;
                             });
                             //the whole response has been recieved, so we just print it out here
                             response.on('end', function () {
                             console.log('Response: ' + str);
                             });
                     }
             var req = https.request(options, callback);
             req.write(postdata);
             req.end();
             req.on('error', function (e) {
             Log(e);
     });
    }

exec(updateCheck, (error, stdout, stderr) => {
  if (stdout){
    PushNotification(process.env.NODENAME + " system update prevented.","Delaying system update... Node was updating.");
    console.log('Delaying system update... Node is updating.');
  }else{
    exec(biddingCheck, (error, stdout, stderr) => {
      if (stdout){
        PushNotification(process.env.NODENAME + " system update prevented.","Delaying system update... Node was bidding.");
        console.log('Delaying system update... Node is currently bidding.');
      }else{
        exec(stopNode, (error, stdout, stderr) => {
          if (error){
            PushNotification(process.env.NODENAME + " system update failed.","Failed to stop node.");
            console.log('Failed to stop node.');
          }
          else{
            console.log('Node stopped.');
            console.log('Updating system...');
            exec(sysUpdate, (error, stdout, stderr) => {
              if (error){
                PushNotification(process.env.NODENAME + " system update failed.","Failed to update system.");
                console.log('Failed to update system.');
              }
              else{
                console.log('System update complete.');
                console.log('Rebooting...');
                PushNotification(process.env.NODENAME + " rebooted for a system update.","Stand by for reboot confirmation.");
                exec(reboot, (error, stdout, stderr) => {
                  if (error){
                    PushNotification(process.env.NODENAME + " system update failed.","Failed to reboot.");
                    console.log('Failed to reboot.');
                  }
                });
              }
            });
          }
        });
      }
    });
  }
});
