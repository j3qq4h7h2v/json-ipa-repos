#!/bin/bash

# Скрипт для создания репозитория на GitHub
# Требуется GitHub токен с правами на создание репозиториев

echo "Создание репозитория json-ipa-repos на GitHub..."

# Запрос токена у пользователя
echo "Введите ваш GitHub токен (с правами repo):"
read -s GITHUB_TOKEN

if [ -z "$GITHUB_TOKEN" ]; then
    echo "Ошибка: Токен не введен"
    exit 1
fi

# Создание репозитория через GitHub API
RESPONSE=$(curl -X POST \
  -H "Authorization: token $GITHUB_TOKEN" \
  -H "Accept: application/vnd.github.v3+json" \
  https://api.github.com/user/repos \
  -d '{
    "name": "json-ipa-repos",
    "description": "Collection of JSON files with IPA repositories for AltStore, SideStore and Scarlet",
    "private": false,
    "has_issues": true,
    "has_projects": false,
    "has_wiki": false
  }' 2>/dev/null)

# Проверка ответа
if echo "$RESPONSE" | grep -q '"full_name"'; then
    REPO_URL=$(echo "$RESPONSE" | grep -o '"html_url": "[^"]*"' | cut -d'"' -f4)
    echo "✅ Репозиторий создан: $REPO_URL"

    # Добавление remote и push
    git remote add origin "$REPO_URL.git"
    git branch -M main
    git push -u origin main

    echo "✅ Код загружен на GitHub!"
    echo "📋 Ссылка на репозиторий: $REPO_URL"

else
    echo "❌ Ошибка создания репозитория:"
    echo "$RESPONSE"
fi
