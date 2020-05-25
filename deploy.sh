#!/usr/bin/env bash

#npm run build &&
docker-compose build &&
docker push hayden321/tomato:latest &&

ssh -i ~/.ssh/MyKeyPair.pem ubuntu@$EC2IP4 /bin/bash <<EOF
    sudo docker pull hayden321/tomato:latest &&
    sudo docker container stop tomato &&
    sudo docker container rm tomato &&
    sudo docker container run -d --network=host --restart=always -p 3002:3002 --log-opt max-size=10m --log-opt max-file=3 --name tomato hayden321/tomato:latest
EOF

