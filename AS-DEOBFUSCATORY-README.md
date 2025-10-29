# Node.js ASDeobfuscator

Node.js реализация декодера/кодера, аналогичного Swift классу ASDeobfuscator из Esign проекта.

## 🚀 Быстрый старт

```javascript
const { ASDeobfuscator, ASDecrypt } = require('./as-deobfuscator');

// Декодирование
const obfuscator = new ASDeobfuscator("source[5GHxhb1U7Lc5jIMpumASbN2teg9dyK5EAazzwnfm1/gPKQPTW.....]");
const result = obfuscator.decode();
console.log(result); // ['decoded', 'strings']

// Или статический метод
const decoded = ASDeobfuscator.decode("source[BASE64_STRING]");
```

## 📋 API

### ASDeobfuscator

#### Конструктор
```javascript
const obfuscator = new ASDeobfuscator(code);
```

#### Методы

##### `decode()` - декодирование
```javascript
const result = obfuscator.decode();
// Возвращает: string[]
```

##### `static decode(code)` - статический декодер
```javascript
const result = ASDeobfuscator.decode(code);
// code: string
// Возвращает: string[]
```

##### `static decodeBase64(code)` - декодирование base64
```javascript
const result = ASDeobfuscator.decodeBase64(base64String);
// Возвращает: string[]
```

##### `static encode(strings, useSourceFormat, delimiter)` - кодирование
```javascript
const encoded = ASDeobfuscator.encode(['string1', 'string2'], true, '[K$]');
// strings: string[] - массив строк для кодирования
// useSourceFormat: boolean - использовать формат source[...]
// delimiter: string - разделитель для множественных строк
// Возвращает: string
```

##### `static encodeSource(strings, delimiter)` - кодирование в source формат
```javascript
const encoded = ASDeobfuscator.encodeSource(['string1', 'string2'], '[K$]');
// Возвращает: string в формате "source[BASE64]"
```

##### `static encodeWithDelimiter(strings, delimiter)` - кодирование с разделителем
```javascript
const encoded = ASDeobfuscator.encodeWithDelimiter(['string1', 'string2'], '[K$]');
// Возвращает: string в base64 формате с разделителями
```

### ASDecrypt

##### `static decrypt(input)` - декодирование source формата
```javascript
const result = ASDecrypt.decrypt("source[BASE64_STRING]");
// Возвращает: string[] | null
```

##### `static encrypt(strings, delimiter)` - кодирование в source формат
```javascript
const encoded = ASDecrypt.encrypt(['string1', 'string2'], '[K$]');
// Возвращает: string в формате "source[BASE64]"
```

## 🔧 Поддерживаемые форматы

### 1. Source формат
```
source[BASE64_STRING]
```
Извлекает BASE64 из скобок и декодирует.

### 2. Base64 с разделителями
```
BASE64_STRING содержащий [K$] или [M$]
```
Декодирует base64, затем разбивает по разделителям.

### 3. Простой base64
```
BASE64_STRING
```
Декодирует в одну строку.

### 4. Простой текст
```
line1
line2
line3
```
Разбивает по переносам строк.

## 📝 Примеры

### Декодирование source формата
```javascript
const encoded = "source[SGVsbG9bSyRdV29ybGRbSyRdVGVzdA==]";
const decoded = ASDeobfuscator.decode(encoded);
console.log(decoded); // ['Hello', 'World', 'Test']
```

### Кодирование в source формат
```javascript
const strings = ['Hello', 'World', 'Test'];
const encoded = ASDeobfuscator.encodeSource(strings, '[K$]');
console.log(encoded); // source[SGVsbG9bSyRdV29ybGRbSyRdVGVzdA==]
```

### Работа с base64
```javascript
const base64 = Buffer.from('Hello World').toString('base64');
const decoded = ASDeobfuscator.decode(base64);
console.log(decoded); // ['Hello World']
```

## 🧪 Тестирование

Запустите тесты:
```bash
node test.js
```

## 🔄 Совместимость со Swift

Node.js реализация полностью совместима с Swift версией ASDeobfuscator:

- ✅ Одинаковая логика декодирования
- ✅ Поддержка всех форматов
- ✅ Обработка разделителей [K$] и [M$]
- ✅ Source формат декодирование
- ✅ Прямое и обратное преобразование

## 📦 Установка

Просто скачайте `as-deobfuscator.js` и импортируйте:

```javascript
const { ASDeobfuscator, ASDecrypt } = require('./as-deobfuscator');
```

## 🐛 Отчеты об ошибках

Если найдете несоответствия со Swift версией, создайте issue в репозитории.
