#!/usr/bin/env bash

$SHELL ./builder/release/bundle.sh &
$SHELL ./builder/release/server.sh &
wait
