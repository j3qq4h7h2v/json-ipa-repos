const inputString = "5GHxhb1U7Lc5jIMpumASbN2teg9dyK5EAazzwnfm1/gPKQPTWzcz/GqlPDc/7Km2PMYo6ZLWw8aBN0jFOyphsztwijHaOP/HgNtFseMyB1X3pIk160RewkryDArE1lISm0HZQx6btqaPoWIbUrY/FxTCEtGJpQ6+9ujCX3eF30gWYgFjnJbYdXm7tILE8/S0ufBvHI+j9EfNayBBFSrp4N5jLdtIgHITwqOtWL1B5cLD9dnu/oiTYur/H9ZpdRvCWi+DPlViqZ+9WGJMAQGo9iASwmzILbR7PNswqGQx8MORSbs6uUfEUFsGuH3agxQW4ula1zXOByc3UBM1lFa9aIvockAMoPBptOr4369reKiaL9vgWVRlePsPlz0CEaOtVOQyiK7azesJ8EZNwrrBQqXPIbQLE+ZSGkN2BQ2yTUghIXNvQiugRHmWknDHN0r82lw9EhRtjKKqkb/hNx+oHkS0ZHhtS/Vjzu+qzzSlJxF9+VTssUUY5ZXn5v8IQqcs/blOhi/OUUJ3bsGjtDse1P89KtNgIwW2TgPc0aoosecHg2vLKSC3UL4Nmb2HbdMTjoG2vVZlmh4UYOi6uxWk0237iwGTb3GGVUpiSLL4ZPZla71t3VoWomKHby9IFPYkAY28yvHjNNv4VVuujljZ5d3ncmA62X3TqJljcqTJJ1xlgyd69CqqEn6pbKJyhARdalZr/bv9reaf6RYNix/91D+Djp0q7lWS8RMaRrB3U7g7Y/070f/38rpSEg6KAxnvUCncRsKYf9bK32xhjXNRmmk5i8cy0TG074DXoJykeLPzBCiKK/cYRFBZnnbnsEghBz/FspJ2oKIf2czQpVtHcNcfQpEgg+6i4E+3nQL7bLZXz70+m4OULKetJ20I16M0iR/LviMUOmVy3Prt1vNxbo9nXbsnTX+LjngKLHYVVhg0A/9zdf4uTmRCz5ZFunpCGaZ4JyMoxo/OHxHfAJcZauufH9FQJp3YVr+jJbg2473ZVYWHzjSc8ultRYs7GkG1SAV4RZv8NmDkQEb5FpfhNiX+0zkLVsKLcNETqcQ7BcPIT7gmEO0TssdgqaxIoPzGbpiZPpVU19/sJv595RDJxnLai70E8yH5hTNyQdu8sFM/6Z98ZxuRuKfsaqkckF2NhXeRTM0eLZMoFD9HPk7U94Jn39lR4oh6/UNowCriv5MeUi8+4oCFI5X5vLjshekM8uXrnzprelevqdinzkm1hLzciFdZmbnL2uQOdCIKBVs4l6p7/L1dwTnooc5flrq4mfgAeawCtK7bmQqmbz53Z+0RYxvYud4Luan8ZReugPw/FHcIBL8On5yK+3Jm0D9PlRGt4dTXCXXB0O/Bqs/5llkgI8rryIVXnTEFGYIAMtqLPwZqu9v/ZZkSI+sc3OpSyBlrY0OG4IdVKZliJ6Gds8tBLzwOw47G3bKrHhFSPFGa0qEUcu0BlTPdyLiA6Gtj55jya0gGRq2bIETYX5YTdAzFlbOu69R7Qv9AMzhNJoaHAYmSAX7baUx21O+0Q6zkjWkncBsxj7X2vWMlXNkPmKCnd7RFlIrMF5xdnCao9GgVxgv2yKkQWRHOEYYxiJSY3gEF38d5Mi6CDhGfZM+vbMjDIoIbgRSvySRz9ZUdG1OUbLoKr9vOEOdVtUs/M2h1/MALPY+utaZfihOLQSWC8/GQdvMZqTWPzhMGOZ+nwyGSGAElhuGFKdnE1FbsfXUOp04gf+OU3Nrz1O5mIvGunvwD2sDMJV8Ro4537iYOKn7s0+PJ69bIxYP5NagIoKWL/6/HK9odSxYNaDSvVxuTGGf5wCmx7jSRcAq2z4ZF+JQyr8oTVe2LhSNomjzyJA+1/y7VmYvdq+5SSrGuF04jbAqtEpfn7ZET0Po/Rk3hfm/3H5eHrzj76XAV3yjksl7Id3c9";

console.log('Проверка декодирования base64...');

// Пробуем декодировать как обычный base64
try {
    const decoded = Buffer.from(inputString, 'base64').toString('utf8');
    console.log('Успешно декодировано как base64!');
    console.log('Длина:', decoded.length);
    console.log('Содержимое (первые 500 символов):');
    console.log(decoded.substring(0, 500));
    console.log('...');

    // Проверяем на разделители
    if (decoded.includes('[K$]') || decoded.includes('[M$]')) {
        console.log('\nНайдены разделители, разбиваем:');
        const delimiter = decoded.includes('[K$]') ? '[K$]' : '[M$]';
        const parts = decoded.split(delimiter).map(p => p.trim()).filter(p => p);
        console.log(`Количество частей: ${parts.length}`);
        parts.forEach((part, i) => {
            console.log(`${i + 1}: ${part.substring(0, 100)}${part.length > 100 ? '...' : ''}`);
        });
    }
} catch (error) {
    console.log('Не является валидной base64 строкой:', error.message);
}

// Пробуем URL-safe base64
try {
    const urlSafe = inputString.replace(/-/g, '+').replace(/_/g, '/');
    const decoded = Buffer.from(urlSafe, 'base64').toString('utf8');
    console.log('\nURL-safe base64 декодирование успешно!');
    console.log('Длина:', decoded.length);
    console.log('Содержимое (первые 500 символов):');
    console.log(decoded.substring(0, 500));
} catch (error) {
    console.log('Не является URL-safe base64:', error.message);
}
