#!/usr/bin/env bash

mkdir -p l10n

python builder/helpers/i18n/extractors/run_babel.py init \
--locale=$1 \
--input-file=./l10n/messages.pot \
--output-dir=./l10n

