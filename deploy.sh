#!/usr/bin/env bash

npm run build &&
docker-compose build &&
docker push hayden321/tomato:latest &&
ssh -i ~/.ssh/MyKeyPair.pem ubuntu@$ec2ip4 "\
    sudo docker pull hayden321/tomato:latest && \
    sudo docker container stop tomato && \
    sudo docker container rm tomato && \
    sudo docker container run -d --restart=always -p 3002:3002 --name tomato hayden321/tomato:latest \
"


