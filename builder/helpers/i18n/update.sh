#!/usr/bin/env bash

mkdir -p l10n

python builder/helpers/i18n/extractors/run_babel.py update \
--width=160 \
--no-fuzzy-matching  \
--input-file ./l10n/messages.pot \
--output-dir ./l10n

find ./l10n -name 'messages.po' | xargs sed -i '' 's/#~ //g'
