#!/bin/bash
set -e
git clone $REPO_URL
cd $REPO_NAME

npm install

npm run build

mv  /$REPO_NAME/build /app/staticContent/
echo "the build folder is moved"
redis-cli -h $REDIS_HOST -p $REDIS_PORT RPUSH $REDIS_QUEUE $CONTAINER_NAME
