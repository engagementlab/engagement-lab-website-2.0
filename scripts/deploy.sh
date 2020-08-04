#!/bin/bash

# Require arg
if [  $# -eq 0 ]; then
    echo "Must run script w/ one arg, either 'qa' or 'prod'"
    exit 1
fi

# Source/load nvm
[[ -s $HOME/.nvm/nvm.sh ]] && . $HOME/.nvm/nvm.sh;

# Client
bash ./toggledowntime.sh start; 
cd client; 

nvm use;
npm i;
cd node_modules/el-scss;
npm i;
cd ../..;

pm2 stop 'elab-web-client'; 

if [ "$1" == "prod" ]; then
    npm run build;
else
    npm run build:qa;
fi

pm2 start 'elab-web-client';

# API
cd content;
nvm use;
npm i;
pm2 restart 'elab-web-api';

# Stop downtime page
cd ../..;
bash ./toggledowntime.sh stop