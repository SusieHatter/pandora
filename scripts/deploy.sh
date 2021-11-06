#!/bin/bash

# Import env vars from .env
set -o allexport
source .env set
set +o allexport

endpoint="$DEPLOY_USER@$DEPLOY_URL:pandora"
echo "Deploying to $endpoint"
scp -r src .env package.json package-lock.json $endpoint