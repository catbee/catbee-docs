#!/usr/bin/env bash

mkdir -p l10n

python builder/helpers/i18n/extractors/run_babel.py extract \
--msgid-bugs-address=example@foo.com \
--copyright-holder="Example team" \
--keyword=_t:1 --keyword=_nt:1,3 --keyword=_pt:1c,2 --keyword=_npt:1c,2,4 \
--add-comments=";" \
--width=160 \
--mapping=builder/helpers/i18n/extractors/babel.cfg \
--no-default-keywords \
--strip-comment-tags \
--no-location \
-o ./l10n/messages.pot \
components/ actions/
