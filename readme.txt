Setting up the project
1. Unzip the zhang_kevin_project2 folder and place it under your WAMP server 
2. Navigate to your WAMP directory (e.g. C:\wamp64\bin\apache\apache2.4.23\conf) and edit the httpd.conf.
Change the line "Require none" to "Require all granted".
3. Navigate to the C:\wamp64\bin\apache\apache2.4.23\conf\extra\httpd-vhost.conf directory and edit the http-vhost.conf.
Make sure the lines "AllowOverride All" and "Require all granted" are present.
4. Restart the web server. 

For additional help with the previous three steps, visit this link: https://stackoverflow.com/questions/39338660/android-you-dont-have-permission-to-access-on-this-server-wamp

Running the project will require the ip address of the server, so make sure you have it.
Getting ip address
1. Open command line
2. Type "ipconfig"
3. Copy the value in the line "IPv4 Address".