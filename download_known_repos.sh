#!/bin/bash

# Скрипт для скачивания JSON файлов из известных репозиториев с AltStore sources

echo "Скачивание из известных репозиториев..."

# Список известных путей к JSON файлам
known_files=(
    "https://raw.githubusercontent.com/altstoreio/FAQ/main/.gitbook/assets/ClassicSource.json"
    "https://raw.githubusercontent.com/Balackburn/Apollo/main/apps.json"
    "https://raw.githubusercontent.com/TheResonanceTeam/TrollApps/main/apps.json"
    "https://raw.githubusercontent.com/therealFoxster/altsource/main/index.json"
    "https://raw.githubusercontent.com/luh-99/SideStoreAndAltStore-Sources/main/sources.json"
    "https://raw.githubusercontent.com/TheResonanceTeam/.default-sources/main/default-apps.json"
    "https://raw.githubusercontent.com/neon443/n443source/main/apps.json"
    "https://raw.githubusercontent.com/apikusu/altstore/main/apps.json"
    "https://raw.githubusercontent.com/FriesI23/altstore-repo/main/repo.json"
    "https://raw.githubusercontent.com/utmapp/altstore-repo/main/config.json"
    "https://raw.githubusercontent.com/SideStore/Community-Source/main/sidecommunity.json"
    "https://raw.githubusercontent.com/utmapp/altstore-pal-repo/main/config.json"
    "https://raw.githubusercontent.com/dvntm0/AltStore/main/repo.json"
    "https://raw.githubusercontent.com/dvntm0/AltStore/main/esign.json"
    "https://raw.githubusercontent.com/dvntm0/AltStore/main/feather.json"
    "https://raw.githubusercontent.com/dvntm0/AltStore/main/gbox.json"
    "https://raw.githubusercontent.com/dvntm0/AltStore/main/scarlet.json"
    "https://raw.githubusercontent.com/dvntm0/AltStore/main/sidestore.json"
    "https://raw.githubusercontent.com/Omni-Development/The-Omni-Repository/main/app-repo.json"
    "https://raw.githubusercontent.com/4PERTURE/DirtyRepo/main/DirtyRepo.json"
    "https://raw.githubusercontent.com/hollow-frenk/AltStoreRepository/main/apps.json"
    "https://raw.githubusercontent.com/globlular/repo/main/cypwn_unique_new.json"
    "https://raw.githubusercontent.com/globlular/repo/main/cypwn_unique_newest.json"
    "https://raw.githubusercontent.com/ZASAonSK/repo/main/index.json"
)

downloaded=0
for url in "${known_files[@]}"; do
    # Извлекаем имя файла из URL
    filename=$(basename "$url")

    # Создаем уникальное имя файла
    repo_name=$(echo "$url" | sed 's|https://raw.githubusercontent.com/||' | sed 's|/main/.*||' | tr '/' '_')
    unique_name="${repo_name}_${filename}"

    echo "Скачивание: $unique_name"

    # Скачиваем файл
    if curl -s "$url" -o "$unique_name" 2>/dev/null; then
        # Проверяем содержимое
        if grep -q "bundleIdentifier\|downloadURL" "$unique_name" 2>/dev/null; then
            echo "  ✓ Файл содержит нужные поля"
            ((downloaded++))
        else
            echo "  ✗ Файл не содержит нужных полей, удаляем"
            rm -f "$unique_name"
        fi
    else
        echo "  ✗ Ошибка скачивания"
    fi

    # Небольшая пауза
    sleep 0.5
done

echo "Скачивание завершено! Скачано файлов: $downloaded"
echo "Всего JSON файлов: $(ls -1 *.json 2>/dev/null | wc -l)"
