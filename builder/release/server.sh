#!/usr/bin/env bash

mkdir -p build/release

node ./node_modules/.bin/babel ./actions --out-dir ./build/release/actions &
node ./node_modules/.bin/babel ./components --out-dir ./build/release/components &
node ./node_modules/.bin/babel ./signals --out-dir ./build/release/signals &
node ./node_modules/.bin/babel ./watchers --out-dir ./build/release/watchers &
node ./node_modules/.bin/babel ./routes --out-dir ./build/release/routes &
node ./node_modules/.bin/babel ./services --out-dir ./build/release/services &

node ./node_modules/.bin/babel ./app.js --out-file ./build/release/app.js &
node ./node_modules/.bin/babel ./browser.js --out-file ./build/release/browser.js &
node ./node_modules/.bin/babel ./routes.js --out-file ./build/release/routes.js &

cp ./run.js ./build/release/run.js &
cp -R ./config ./build/release/config &
cp -R ./i18n ./build/release/i18n &
cp -R ./node_modules ./build/release/node_modules &

find ./components -name '*.css' | cpio -pdm ./build/release &
find ./components -name '*.html' | cpio -pdm ./build/release &
find ./components -name '*.json' | cpio -pdm ./build/release &

npm run i18n.po2json && find ./l10n -name '*.json' | cpio -pdm ./build/release &

wait
