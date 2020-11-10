#!/bin/bash

echo "Running static build."

# Source/load nvm
[[ -s $HOME/.nvm/nvm.sh ]] && . $HOME/.nvm/nvm.sh;

nvm use;

# npm run prerender:express &
# SERVERPID= `echo $!` &
cd client;
npm run build;
npm run build:static;
