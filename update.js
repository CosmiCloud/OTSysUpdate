const { exec } = require("child_process");
var stopNode = 'sudo docker stop otnode'
var sysUpdate = 'sudo apt update && sudo apt upgrade -y && sudo apt autoremove -y'
var reboot = 'sudo reboot'
var updateCheck = 'sudo docker logs --since 10m otnode | grep updating'
var biddingCheck = 'sudo docker logs --since 10m otnode | grep Replication'

exec(updateCheck, (error, stdout, stderr) => {
  if (stdout){
    console.log('Delaying system update... Node is updating.');
  }else{
    exec(biddingCheck, (error, stdout, stderr) => {
      if (stdout){
        console.log('Delaying system update... Node is currently bidding.');
      }else{
        exec(stopNode, (error, stdout, stderr) => {
          if (error){
            console.log('Failed to stop node.');
          }
          else{
            console.log('Node stopped.');
            console.log('Updating system...');
            exec(sysUpdate, (error, stdout, stderr) => {
              if (error){
                console.log('Failed to update system.');
              }
              else{
                console.log('System update complete.');
                console.log('Rebooting...');
                exec(reboot, (error, stdout, stderr) => {
                  if (error){
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
