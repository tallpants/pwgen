#!/usr/bin/env sh

yarn build
cd dist
git init
git checkout -b master
git add -A
git commit -m 'deploy'

git push -f git@github.com:tallpants/pwgen master:gh-pages