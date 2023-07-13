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

sudo docker-compose up --build -d

# Database backup, if needed
# while true; do
#   # Delay for 24 hours
#   sleep 60 * 60 * 24
#   echo "Starting postgres backup..."
#   # DB backup command
#   pg_user_variable="POSTGRES_USER"
#   pg_user=$(grep "^$pg_user_variable=" "$env_file" | cut -d '=' -f2-)
#   current_date=$(date +"%Y-%m-%d")
#   docker exec -i postgres /usr/bin/pg_dumpall -U $pg_user > ./postgres/backups/pg-backup-$current_date.sql
# done