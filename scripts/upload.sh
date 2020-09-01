#!/bin/bash
PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/usr/games:/usr/local/games

# Have to re-assign vars from shell env
export AZURE_STORAGE_ACCOUNT=$AZURE_STORAGE_ACCOUNT

# Upload app build to Azure
az storage blob upload-batch -d '$web' -s ./bin/app