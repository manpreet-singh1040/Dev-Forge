#!/bin/bash

git clone $REPO_URL

cd $REPO_NAME

npm install

npm build

mv -r /$REPO_NAME/build /app/staicContent

redis-cli -h $REDIS_HOST -p $REDIS_PORT RPUSH $REDIS_QUEUE $CONTAINER_NAME


