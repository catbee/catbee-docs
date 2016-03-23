#!/usr/bin/env bash

# Подготовка архива для отправки переводчикам

# заново экстрактим строки из проекта
npm run i18n.extract

# апдейтим текущие переводы, те, что уже есть не трогаются, появляются только новые строки
npm run i18n.update

# архивируем все .po файлы в один архив, который и должен в итоге отправляться переводчикам
npm run i18n.archive