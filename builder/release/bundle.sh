#!/usr/bin/env bash

mkdir -p ./build/release/build/public

NODE_ENV=production node build &&

cp -R ./build/public ./build/release/build &

wait
