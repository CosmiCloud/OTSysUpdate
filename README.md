# OTSysUpdate
This will help you set up a cronjob that will trigger a script at 4am every Sunday that runs system updates on your node's VPS instance. <br><br>If the node is updating or bidding on a job, the update will be delayed for another week and the node will not be stopped. <br><br>A @reboot cronjob is used to initiate node start up on reboot after the update is finished.

------------------------------------------------------------------------------------------------------------------------------------------------------------------

Add 2 cronjobs to the bottom of your crontab. 1 to trigger the script and the other to start the OTNode after reboot. Test running the commands before adding it to your crontab.
<ol>
<li>Sudo nano /etc/crontab</li>
<li>Edit and Paste the commands below to the end of your crontab</li>
</ol>

0 4 * * 0 root cd ~/path/to/my/script && node update.js<br>
@reboot root docker start otnode
