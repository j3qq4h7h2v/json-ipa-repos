# JSON IPA Repositories Collection

Коллекция JSON файлов с репозиториями IPA приложений для AltStore, SideStore и Scarlet.

## 📊 Статистика
- **Всего JSON файлов:** 41
- **Найдено репозиториев:** 386 уникальных
- **Источники:** AltStore, SideStore, Scarlet, TrollStore

## 📁 Структура файлов

Каждый JSON файл содержит информацию о приложениях в формате:

```json
{
  "name": "Название приложения",
  "identifier": "com.example.app",
  "apps": [
    {
      "name": "Приложение",
      "bundleIdentifier": "com.example.bundle",
      "developerName": "Разработчик",
      "version": "1.0.0",
      "downloadURL": "https://example.com/app.ipa"
    }
  ]
}
```

## 🔍 Содержимое

### Основные источники:
- `Balackburn_Apollo_apps.json` - Apollo для Reddit
- `SideStore_Community-Source_sidecommunity.json` - SideStore сообщество
- `Omni-Development_The-Omni-Repository_app-repo.json` - Большой репозиторий приложений
- `dvntm0_AltStore_repo.json` - Инструменты джейлбрейка
- И многие другие...

## 🛠 Инструменты сбора

- `download_json_files.sh` - Скрипт автоматического скачивания
- `download_known_repos.sh` - Скачивание из известных репозиториев
- `all_repos_final.txt` - Список всех найденных репозиториев

## 📋 Использование

Эти JSON файлы используются AltStore, SideStore и Scarlet для установки IPA приложений на iOS устройства.

## ⚠️ Важно

- Все файлы собраны из открытых источников GitHub
- Проверены на наличие полей `bundleIdentifier` и `downloadURL`
- Используйте на свой страх и риск

## 🔄 Обновление

Для обновления коллекции запустите:
```bash
./download_json_files.sh
./download_known_repos.sh
```
