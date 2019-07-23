Setting up the project
1. Unzip the zhang_kevin_project2 folder and place it under your WAMP server 
2. Navigate to your WAMP directory (e.g. C:\wamp64\bin\apache\apache2.4.23\conf) and edit the httpd.conf.
Change the line "Require none" to "Require all granted".
3. Navigate to the C:\wamp64\bin\apache\apache2.4.23\conf\extra\httpd-vhost.conf directory and edit the http-vhost.conf.
Make sure the lines "AllowOverride All" and "Require all granted" are present.
4. Restart the web server. 

For additional help with the previous three steps, visit this link: https://stackoverflow.com/questions/39338660/android-you-dont-have-permission-to-access-on-this-server-wamp

Setting up the database
1. Create a database called "vanguard" in MySQL 
2. Run the scripts in the zhang_kevin_project2/sql folder. Verify that a table called users, decks, cards_all, ownsdeck, and deckcontains have been created
3. Verify that your database has an admin user with the name "root" and an empty password. This is the name used in the config.php file. If you need to edit the user, change this file.

Running the project will require the ip address of the server, so make sure you have it.
Getting ip address
1. Open command line
2. Type "ipconfig"
3. Copy the value in the line "IPv4 Address".