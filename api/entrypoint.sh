#!/bin/bash
set -e

npx sequelize-cli db:create
npx sequelize-cli db:migrate

npm start

# Then exec the container's main process use CMD (what"s set as CMD in the Dockerfile).
# exec "$@"