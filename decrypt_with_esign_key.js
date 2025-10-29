const fs = require('fs');

// Функция XOR decryption
function xorDecrypt(encryptedData, key) {
    const keyLength = key.length;
    const decrypted = Buffer.alloc(encryptedData.length);

    for (let i = 0; i < encryptedData.length; i++) {
        decrypted[i] = encryptedData[i] ^ key[i % keyLength];
    }

    return decrypted;
}

// Загрузка esign ключа
function loadEsignKey() {
    try {
        const keyHex = fs.readFileSync('esign_key_clean.txt', 'utf8').trim();
        return Buffer.from(keyHex, 'hex');
    } catch (error) {
        console.error('Ошибка загрузки ключа:', error.message);
        return null;
    }
}

// Основная функция декодирования
function decryptWithEsignKey(encryptedBase64) {
    const key = loadEsignKey();
    if (!key) {
        console.error('Не удалось загрузить ключ');
        return null;
    }

    console.log(`Ключ загружен: ${key.length} байт`);

    try {
        // Декодируем base64
        const encryptedData = Buffer.from(encryptedBase64, 'base64');
        console.log(`Зашифрованные данные: ${encryptedData.length} байт`);

        // Расшифровываем XOR
        const decrypted = xorDecrypt(encryptedData, key);
        console.log(`Расшифрованные данные: ${decrypted.length} байт`);

        // Конвертируем в строку UTF-8
        const decryptedString = decrypted.toString('utf8');
        console.log(`Длина строки: ${decryptedString.length} символов`);

        // Разбиваем по \n и фильтруем
        const urls = decryptedString.split('\n').map(line => line.trim()).filter(line => line.length > 0);

        console.log(`Найдено URL: ${urls.length}`);

        return {
            rawData: decrypted,
            text: decryptedString,
            urls: urls
        };
    } catch (error) {
        console.error('Ошибка декодирования:', error.message);
        return null;
    }
}

// Основная функция
function main() {
    const encryptedString = "5GHxhb1U7Lc5jIMpumASbN2teg9dyK5EAazzwnfm1/gPKQPTWzcz/GqlPDc/7Km2PMYo6ZLWw8aBN0jFOyphsztwijHaOP/HgNtFseMyB1X3pIk160RewkryDArE1lISm0HZQx6btqaPoWIbUrY/FxTCEtGJpQ6+9ujCX3eF30gWYgFjnJbYdXm7tILE8/S0ufBvHI+j9EfNayBBFSrp4N5jLdtIgHITwqOtWL1B5cLD9dnu/oiTYur/H9ZpdRvCWi+DPlViqZ+9WGJMAQGo9iASwmzILbR7PNswqGQx8MORSbs6uUfEUFsGuH3agxQW4ula1zXOByc3UBM1lFa9aIvockAMoPBptOr4369reKiaL9vgWVRlePsPlz0CEaOtVOQyiK7azesJ8EZNwrrBQqXPIbQLE+ZSGkN2BQ2yTUghIXNvQiugRHmWknDHN0r82lw9EhRtjKKqkb/hNx+oHkS0ZHhtS/Vjzu+qzzSlJxF9+VTssUUY5ZXn5v8IQqcs/blOhi/OUUJ3bsGjtDse1P89KtNgIwW2TgPc0aoosecHg2vLKSC3UL4Nmb2HbdMTjoG2vVZlmh4UYOi6uxWk0237iwGTb3GGVUpiSLL4ZPZla71t3VoWomKHby9IFPYkAY28yvHjNNv4VVuujljZ5d3ncmA62X3TqJljcqTJJ1xlgyd69CqqEn6pbKJyhARdalZr/bv9reaf6RYNix/91D+Djp0q7lWS8RMaRrB3U7g7Y/070f/38rpSEg6KAxnvUCncRsKYf9bK32xhjXNRmmk5i8cy0TG074DXoJykeLPzBCiKK/cYRFBZnnbnsEghBz/FspJ2oKIf2czQpVtHcNcfQpEgg+6i4E+3nQL7bLZXz70+m4OULKetJ20I16M0iR/LviMUOmVy3Prt1vNxbo9nXbsnTX+LjngKLHYVVhg0A/9zdf4uTmRCz5ZFunpCGaZ4JyMoxo/OHxHfAJcZauufH9FQJp3YVr+jJbg2473ZVYWHzjSc8ultRYs7GkG1SAV4RZv8NmDkQEb5FpfhNiX+0zkLVsKLcNETqcQ7BcPIT7gmEO0TssdgqaxIoPzGbpiZPpVU19/sJv595RDJxnLai70E8yH5hTNyQdu8sFM/6Z98ZxuRuKfsaqkckF2NhXeRTM0eLZMoFD9HPk7U94Jn39lR4oh6/UNowCriv5MeUi8+4oCFI5X5vLjshekM8uXrnzprelevqdinzkm1hLzciFdZmbnL2uQOdCIKBVs4l6p7/L1dwTnooc5flrq4mfgAeawCtK7bmQqmbz53Z+0RYxvYud4Luan8ZReugPw/FHcIBL8On5yK+3Jm0D9PlRGt4dTXCXXB0O/Bqs/5llkgI8rryIVXnTEFGYIAMtqLPwZqu9v/ZZkSI+sc3OpSyBlrY0OG4IdVKZliJ6Gds8tBLzwOw47G3bKrHhFSPFGa0qEUcu0BlTPdyLiA6Gtj55jya0gGRq2bIETYX5YTdAzFlbOu69R7Qv9AMzhNJoaHAYmSAX7baUx21O+0Q6zkjWkncBsxj7X2vWMlXNkPmKCnd7RFlIrMF5xdnCao9GgVxgv2yKkQWRHOEYYxiJSY3gEF38d5Mi6CDhGfZM+vbMjDIoIbgRSvySRz9ZUdG1OUbLoKr9vOEOdVtUs/M2h1/MALPY+utaZfihOLQSWC8/GQdvMZqTWPzhMGOZ+nwyGSGAElhuGFKdnE1FbsfXUOp04gf+OU3Nrz1O5mIvGunvwD2sDMJV8Ro4537iYOKn7s0+PJ69bIxYP5NagIoKWL/6/HK9odSxYNaDSvVxuTGGf5wCmx7jSRcAq2z4ZF+JQyr8oTVe2LhSNomjzyJA+1/y7VmYvdq+5SSrGuF04jbAqtEpfn7ZET0Po/Rk3hfm/3H5eHrzj76XAV3yjksl7Id3c9";

    console.log('=== Декодирование с esign ключом ===\n');

    const result = decryptWithEsignKey(encryptedString);

    if (result) {
        console.log('\n=== РЕЗУЛЬТАТ ===');
        console.log(`Количество URL: ${result.urls.length}`);

        if (result.urls.length > 0) {
            console.log('\nПервые 10 URL:');
            result.urls.slice(0, 10).forEach((url, i) => {
                console.log(`${i + 1}: ${url}`);
            });

            if (result.urls.length > 10) {
                console.log(`\n... и еще ${result.urls.length - 10} URL`);
            }

            // Сохраняем все URL в файл
            fs.writeFileSync('decrypted_urls.txt', result.urls.join('\n'));
            console.log('\nВсе URL сохранены в файл decrypted_urls.txt');
        }
    } else {
        console.log('Декодирование не удалось');
    }
}

if (require.main === module) {
    main();
}

module.exports = { xorDecrypt, loadEsignKey, decryptWithEsignKey };
