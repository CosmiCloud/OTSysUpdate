# OTSysUpdate
This will help you set up a cronjob that will trigger a script at 4am every Sunday that runs system updates on your node's VPS instance. <br><br>If the node is updating or bidding on a job, the update will be delayed for another week and the node will not be stopped. <br><br>A @reboot cronjob is used to initiate node start up on reboot after the update is finished. You will receive a Push notification whenever the script completes or fails. If the script does fail, the notification will include log statements to identify the issue.
<br><br>
Install the 'Notify My Device' app from the app store and install it onto your mobile device.
<br><br>
Navigate to https://www.notifymydevice.com/ and create an account. Go to 'My applications' and create an application. Copy the API key and save it for later.

------------------------------------------------------------------------------------------------------------------------------------------------------------------

On your node:<br>
Install npm, nodejs
<ul>
<li>sudo apt install npm</li>
<li>sudo apt install nodejs</li>
</ul>

Edit your environment variables inside of your directory and add your API key and change your node name.
<ol>
<li>Sudo nano .env</li>
<li>Paste and edit the variables below</li>
</ol>

APIKEY=myapikey<br>
NODENAME="my node name"

Add 2 cronjobs to the bottom of your crontab. 1 to trigger the script and the other to start the OTNode after reboot. Test running the commands before adding it to your crontab.
<ol>
<li>Sudo nano /etc/crontab</li>
<li>Edit and Paste the commands below to the end of your crontab</li>
</ol>

0 4 * * 0 root cd ~/path/to/my/script && node update.js<br>
@reboot root cd ~/path/to/my/script && node startNode.js
