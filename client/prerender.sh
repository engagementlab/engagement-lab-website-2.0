#!/bin/bash

echo "Running prerender"

# Source/load nvm
[[ -s $HOME/.nvm/nvm.sh ]] && . $HOME/.nvm/nvm.sh;

nvm use;

npm run prerender:express &
npm run prerender:compile;
