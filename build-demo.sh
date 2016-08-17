#!/bin/sh

MODULE_NAME="scrollTo"

jspm link github:DEGJS/$MODULE_NAME -f

cd demo

mkdir dist
mkdir dist/js

cd src

jspm install
jspm install --link github:DEGJS/$MODULE_NAME
jspm bundle-sfx main ../dist/js/main.js --skip-source-maps

cp *.html ../dist/
cp *.css ../dist/
cp -R js/polyfills/ ../dist/js/polyfills