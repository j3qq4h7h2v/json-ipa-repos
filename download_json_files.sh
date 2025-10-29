#!/bin/bash

# Скрипт для скачивания JSON файлов с IPA репозиториями из GitHub

echo "Начинаем скачивание JSON файлов с IPA репозиториями..."

# Читаем список репозиториев
while read repo; do
    if [ -z "$repo" ]; then
        continue
    fi

    echo "Обработка репозитория: $repo"

    # Получаем список JSON файлов в репозитории
    json_files=$(curl -s "https://api.github.com/repos/$repo/contents" | jq -r '.[] | select(.name | endswith(".json")) | .name' 2>/dev/null)

    if [ -z "$json_files" ]; then
        echo "  Нет JSON файлов в $repo"
        continue
    fi

    # Скачиваем каждый JSON файл
    echo "$json_files" | while read json_file; do
        if [ -z "$json_file" ]; then
            continue
        fi

        # Создаем безопасное имя файла
        safe_name="${repo//\//_}_${json_file}"

        echo "  Скачивание: $json_file -> $safe_name"

        # Скачиваем файл
        if curl -s "https://raw.githubusercontent.com/$repo/main/$json_file" -o "$safe_name" 2>/dev/null; then
            # Проверяем, содержит ли файл нужные поля
            if grep -q "bundleIdentifier\|downloadURL" "$safe_name" 2>/dev/null; then
                echo "    ✓ Файл содержит bundleIdentifier/downloadURL"
            else
                echo "    ✗ Файл не содержит нужных полей, удаляем"
                rm -f "$safe_name"
            fi
        else
            echo "    ✗ Ошибка скачивания"
        fi
    done

    # Небольшая пауза, чтобы не перегружать GitHub API
    sleep 1

done < repos_list_final.txt

echo "Скачивание завершено!"
echo "Найдено файлов: $(ls -1 *.json 2>/dev/null | wc -l)"
