#!/bin/bash

echo
echo "=================================="
echo "Cleaning..."
echo "----------------------------------"
echo
docker compose down --remove-orphans
echo
echo "----------------------------------"
echo "Cleaning done."
echo "=================================="
echo


# Creating /data folder
echo
echo "=================================="
echo "Creating helping folder..."
echo "----------------------------------"
echo
mkdir ./data
mkdir ./data/cfgsvr
mkdir ./data/router
mkdir ./data/shard01-a
mkdir ./data/shard01-b
mkdir ./data/shard01-c
mkdir ./data/shard02-a
mkdir ./data/shard02-b
mkdir ./data/shard02-c
echo "----------------------------------"
echo "Data folder is created."
echo "=================================="
echo

echo
echo "=================================="
echo "Starting..."
echo "----------------------------------"
echo
docker compose up -d
sleep 5
echo
echo "----------------------------------"
echo "All components are up"
echo "=================================="
echo

# Initialization of configuration server
echo
echo "=================================="
echo "Setting up configuration server..."
echo "----------------------------------"
echo
docker compose exec cfgsvr sh -c "mongosh < /scripts/init-scripts/init-configserver.js"
echo
echo "----------------------------------"
echo "Configuration server is initialized."
echo "=================================="
echo


# Initialization of shard01
echo
echo "=================================="
echo "Setting up shard 1..."
echo "----------------------------------"
echo
docker compose exec shard01-a sh -c "mongosh < /scripts/init-scripts/init-shard01.js"
echo
echo "----------------------------------"
echo "Shard 1 is initialized."
echo "=================================="
echo


# Initialization of shard02
echo
echo "=================================="
echo "Setting up shard 2..."
echo "----------------------------------"
echo
docker compose exec shard02-a sh -c "mongosh < /scripts/init-scripts/init-shard02.js"
echo
echo "----------------------------------"
echo "Shard 2 is initialized."
echo "=================================="
echo

# Waiting for shard01 election
while true; do

  docker compose logs shard01-a | grep -i 'Election succeeded'
  a1=$(echo $?)
  docker compose logs shard01-b | grep -i 'Election succeeded'
  b1=$(echo $?)
  docker compose logs shard01-c | grep -i 'Election succeeded'
  c1=$(echo $?)

  if [ "${a1}" != 0 ] && [ "${b1}" != 0 ] && [ "${c1}" != 0 ]; then
    echo "Waiting for shard 1 election success..."
    sleep 5
  else
    echo
    echo "----------------------------------"
    echo "Shard 1 is ready!"
    echo "=================================="
    echo
    break
  fi
done

# Waiting for shard02 election
while true; do
  docker compose logs shard02-a | grep -i 'Election succeeded'
  a2=$(echo $?)
  docker compose logs shard02-b | grep -i 'Election succeeded'
  b2=$(echo $?)
  docker compose logs shard02-c | grep -i 'Election succeeded'
  c2=$(echo $?)


  if [ "${a2}" != 0 ] && [ "${b2}" != 0 ] && [ "${c2}" != 0 ]; then
    echo "Waiting for shard 2 election success..."
    sleep 5
  else
    echo
    echo "----------------------------------"
    echo "Shard 2 is ready!"
    echo "=================================="
    echo
    break
  fi
done


# Router
echo
echo "=================================="
echo "Setting up router..."
echo "----------------------------------"
echo
docker compose exec router sh -c "mongosh < /scripts/init-scripts/init-router.js"
echo
echo "----------------------------------"
echo "Router is ready!"
echo "=================================="
echo

# Creating admin user
echo
echo "=================================="
echo "Setting up admin user with username - 'admin' and password - '1234'..."
echo "User 'guest' with 'guest' password is added to router by default."
echo "----------------------------------"
echo
if [ "${a1}" == 0 ]; then
  docker compose exec shard01-a sh -c "mongosh < /scripts/init-scripts/init-admin.js"
elif [ "${b1}" == 0 ]; then
  docker compose exec shard01-b sh -c "mongosh < /scripts/init-scripts/init-admin.js"
else 
  docker compose exec shard01-с sh -c "mongosh < /scripts/init-scripts/init-admin.js"
fi 

if [ "${a2}" == 0 ]; then
  docker compose exec shard02-a sh -c "mongosh < /scripts/init-scripts/init-admin.js"
elif [ "${b2}" == 0 ]; then
  docker compose exec shard02-b sh -c "mongosh < /scripts/init-scripts/init-admin.js"
else 
  docker compose exec shard02-с sh -c "mongosh < /scripts/init-scripts/init-admin.js"
fi 
echo
echo "----------------------------------"
echo "Admin user is set up!"
echo "=================================="
echo

# Inserting data
echo
echo "=================================="
echo "Inserting data..."
echo "----------------------------------"
echo
docker compose exec router sh -c "mongosh < /scripts/insert-scripts/insert_galaxies.js"
docker compose exec router sh -c "mongosh < /scripts/insert-scripts/insert_black_holes.js"
docker compose exec router sh -c "mongosh < /scripts/insert-scripts/insert_stars.js"
echo
echo "----------------------------------"
echo "Inserting is done."
echo "=================================="
echo

# Done
echo
echo "=================================="
echo "Everything is done succesfully."
echo "=================================="
echo