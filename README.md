# SoftwareEngineering-102
## Rate My Course


## Things Needed to run project
- Node
- MongoDB

## Components of the project
- backend - nodejs
- reactjs - UI JS framework built using Vite
- mongoDB - DB system

## How to run the backend
    for the first time:
    - install nodejs from the internet
    - in terminal go to nodejs folder
    - make sure node_modules folder don't exist, if so delete it.
    - run "npm i" in the terminal 
    - our server file is index.js - to start run the command "node index.js" from terminal
    for running after first time
    - go to the nodejs folder and run the command the command "node index.js" from terminal
### Note: The mongo needs to be up and running before starting backend - once you run backend if the db is running you'll see a success message like " RESTful API server started on: 3000 connected successfully to DB"    

## how to run mongo
    - Installation https://www.mongodb.com/docs/manual/administration/install-community/
    - Install Mongo Compass for accessing DB through UI - Optional
    - on Mac and Windows the DB server runs automatically on boot, if on linux  run command "sudo systemctl start mongod"

## how to run the frontend
    for the first time:
        - in terminal go to reactjs/se-102 folder
        - make sure node_modules folder don't exist, if so delete it.
        - run "npm i" in the terminal 
        - run "npm run dev" command
    for running after first time
        -  in terminal go to reactjs/se-102 folder
        - run "npm run dev" command
