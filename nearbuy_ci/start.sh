#!/bin/bash

env_file="./.env"
server_env=$(cat ../nearbuy_server/.env)
vue_env=$(cat ../nearbuy_vue/.env)

# Delete existing env file
if [ -f "$env_file" ]; then
  rm "$env_file"
fi

# Create env file
touch .env
echo -e "$server_env\n$vue_env" > .env

sudo docker-compose up --build