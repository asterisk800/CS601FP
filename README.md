# cs601fp
CS601FP: A simple and not-for-production home automation system with Raspberry Pi

#How to install the ExpressJS Application on a MAC
Go to https://nodejs.org/en/ and download NodeJS version 4.4.3LTL and install it.
#Install MongoDB by downloading the following tgz file:
https://fastdl.mongodb.org/osx/mongodb-osx-x86_64-3.2.5.tgz
#Create a new directory for the project:
mkdir cs601fp
#Change director to the new directory
cd cs601fp
#Initialize a new git repository
git init
#Pull the project repository to your folder
git pull https://github.com/asterisk800/cs601fp.git
#Updating npm
sudo npm install npm -g
#Test:
Run npm -v. The version should be higher than 2.1.8.
#Download and install packages
Sudo npm install
#Start the application:
./bin/www
#To access the Express JS web application, go to:
http://localhost:3000