#!/bin/bash

sudo docker-compose down

env_file="./.env"

# Delete env file
if [ -f "$env_file" ]; then
  rm "$env_file"
fi
