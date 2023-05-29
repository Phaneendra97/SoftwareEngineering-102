# SoftwareEngineering-102
## Rate My Course


## Things Needed to run project (Approach 1: Monolith)
- Node
- MongoDB

## Components of the project
- backend - nodejs
- reactjs - UI JS framework built using Vite
- mongoDB - DB system

## How to run the backend
    for the first time:
    - install nodejs from the internet
    - in the terminal go to nodejs folder
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

----
# Rate My Course: (Approach 2: Microservices)

## Deployment aspects from here(Developer Commands):
why nginx: Facing CORS error when deploying on docker so had to host frontend on nginx using multi-stage docker build


## Need to Have
      Docker
      Minikube


## Docker Compose
```
docker-compose up -d
```

## Docker Individual Containers
```
# Building react Image and Container; path: reactjs/se-102/Dockerfile
docker build -t react-image .
docker run --name react-container -p 80:80 -p 4173:4173 react-image

# Building Node Image and Container; path: nodejs/Dockerfile
docker build -t my-node-image .
docker run --name node-container --rm -p 3000:3000 my-node-image

# Building Mongo
docker run --name mymongodb --rm -d -p 27017:27017 mongo


# Promotheus (Ports might be different for docker-compose and individual container check when running)
docker run -d --name prometheus -p 9090:9090 -v /tmp/prometheus.yml:/etc/prometheus/prometheus.yml prom/prometheus

# Grafana
docker run -d --name grafana -p 3010:3000 grafana/grafana

      ## With volumes Grafana: (volumes for data persistance)
      docker run -d --name grafana -p 3010:3000 -v grafana_config:/etc/grafana -v grafana_data:/var/lib/grafana -v grafana_logs:/var/log/grafana grafana/grafana

       ### Value to use in the Grafana dashboard while linking data sources: 
       http://host.docker.internal:9090 or http://host.docker.internal:9000 based on port 
```


## Some Useful Endpoints
```
#Metrics local port (Shows docker metrics)
http://127.0.0.1:9323/metrics

#Prometheus port
http://127.0.0.1:9090/ 

#Prometheus Alerting(only added in docker compose) - for mailing alerts
http://localhost:9093/#/alerts

# Prometheus Mail Alert Auth token: path to change token and fill from to mail id's: alertmanager/alertmanager.yml
Genertate auth_password from: https://myaccount.google.com/apppasswords

```

## Minikube (environment for local Kubernetes environment)


```
# Need to run the below command to use existing docker demon so we can use existing local docker images in every terminal you use:
eval $(minikube docker-env)

# start
minikube start

# apply yaml; go to folder minikube to get all yaml files
kubectl apply -f filename.yaml


# Facing Networking Issues in Kubernetes should be mostly because of Mac m1 arch based on my research.

    ## Kubernetes Node Port Not Working(Using port forwarding as workaround):
    kubectl port-forward service/react 30000:80

# stop
minikube stop


```


