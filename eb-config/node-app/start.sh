#!/usr/bin/env bash
cd /tmp

rm -rf prosperence; true

git clone https://github.com/prosperence/prosperence.git

cd prosperence
git checkout master

npm install --unsafe-perm
npm start
