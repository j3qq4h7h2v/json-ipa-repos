const crypto = require('crypto');

class ASDeobfuscator {
    constructor(code) {
        this._code = code;
    }

    decode() {
        return ASDeobfuscator.decode(this._code);
    }

    static decode(code) {
        const trimmedCode = code.trim();

        if (!trimmedCode) {
            return [];
        }

        // Handle source[...] format
        if (trimmedCode.startsWith('source[')) {
            return ASDecrypt.decrypt(code) || [];
        }

        // First try to decode as plain text (split by newlines)
        const plainTextResult = trimmedCode
            .split(/\r?\n/)
            .map(line => line.trim())
            .filter(line => line.length > 0);

        // If plain text parsing gives reasonable results, return it
        if (plainTextResult.length > 0) {
            return plainTextResult;
        }

        // Try base64 decoding as fallback
        const base64Decoded = ASDeobfuscator.decodeBase64(trimmedCode);
        if (base64Decoded.length > 0) {
            return base64Decoded;
        }

        // If nothing worked, return empty array
        return [];
    }

    static decodeBase64(code) {
        try {
            const data = Buffer.from(code, 'base64');
            const decodedString = data.toString('utf8');

            // Check for delimiters
            const delimiters = ['[K$]', '[M$]'];
            const delimiter = delimiters.find(d => decodedString.includes(d));

            if (delimiter) {
                return decodedString
                    .split(delimiter)
                    .map(part => part.trim())
                    .filter(part => part.length > 0);
            }

            const trimmedResult = decodedString.trim();
            return trimmedResult ? [trimmedResult] : [];
        } catch (error) {
            return [];
        }
    }

    // Encoding methods
    static encode(strings, useSourceFormat = false, delimiter = '[K$]') {
        if (!Array.isArray(strings) || strings.length === 0) {
            return '';
        }

        let result;

        if (strings.length === 1) {
            // Single string - just encode to base64
            result = Buffer.from(strings[0]).toString('base64');
        } else {
            // Multiple strings - join with delimiter and encode
            result = Buffer.from(strings.join(delimiter)).toString('base64');
        }

        if (useSourceFormat) {
            result = `source[${result}]`;
        }

        return result;
    }

    // Alternative encoding with specific delimiter
    static encodeWithDelimiter(strings, delimiter = '[K$]') {
        return ASDeobfuscator.encode(strings, false, delimiter);
    }

    // Encode in source format
    static encodeSource(strings, delimiter = '[K$]') {
        return ASDeobfuscator.encode(strings, true, delimiter);
    }
}

class ASDecrypt {
    static decrypt(input) {
        try {
            // Extract content from source[...]
            const match = input.match(/^source\[(.+)\]$/);
            if (!match) {
                return null;
            }

            const encodedContent = match[1];

            // Try base64 decoding
            const decoded = ASDeobfuscator.decodeBase64(encodedContent);

            return decoded.length > 0 ? decoded : null;
        } catch (error) {
            return null;
        }
    }

    // For encoding back to source format
    static encrypt(strings, delimiter = '[K$]') {
        return ASDeobfuscator.encode(strings, true, delimiter);
    }
}

// Export for use in other modules
module.exports = {
    ASDeobfuscator,
    ASDecrypt
};

// Example usage:
// const obfuscator = new ASDeobfuscator("source[5GHxhb1U7Lc5jIMpumASbN2teg9dyK5EAazzwnfm1/gPKQPTW.....]");
// const result = obfuscator.decode();
//
// // Encoding back:
// const encoded = ASDeobfuscator.encodeSource(["string1", "string2"], "[K$]");
