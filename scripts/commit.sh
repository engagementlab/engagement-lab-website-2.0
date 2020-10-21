#!/bin/bash

echo "Commit staging database and generated static app."

git config --global user.name "ELDevBot"
git config --global user.email engagementlab@emerson.edu

git branch temp
git checkout temp

git remote set-url origin git@github.com:engagementlab/engagement-lab-website-2.x.git
git add bin/*
git commit --message "Automated database export and generated static app (Travis build #$TRAVIS_BUILD_NUMBER)"
git branch -f master temp
git checkout master

git branch -d temp
git push origin master