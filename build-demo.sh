#!/bin/sh

MODULE_NAME="scrollTo"

mkdir docs
mkdir docs/js

jspm link github:DEGJS/$MODULE_NAME -f

cd demo/src

jspm install
jspm install --link github:DEGJS/$MODULE_NAME
jspm bundle-sfx main ../../docs/js/main.js --skip-source-maps

cp *.html ../../docs/
cp *.css ../../docs/
cp -R js/polyfills/ ../../docs/js/polyfills