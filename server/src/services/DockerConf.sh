#!/bin/bash

# Define the Docker image and container name
#IMAGE_NAME="your-docker-image"
#CONTAINER_NAME="your-container-name"

# Pull the latest version of the Docker image
docker network create devf

docker run -d --name nginx -p 8080:80 --network devf povtemp/nginx

# Run the Docker container
#docker run -d --name $CONTAINER_NAME -p 80:80 $IMAGE_NAME

# Print the status of the Docker container
#docker ps -a | grep $CONTAINER_NAME