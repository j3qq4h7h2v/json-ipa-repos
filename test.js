const { ASDeobfuscator, ASDecrypt } = require('./as-deobfuscator');

console.log('=== Testing ASDeobfuscator ===');

// Test 1: Base64 decoding
console.log('\n1. Base64 decoding:');
const base64Test = Buffer.from('Hello World').toString('base64');
console.log('Original:', 'Hello World');
console.log('Base64:', base64Test);
console.log('Decoded:', ASDeobfuscator.decode(base64Test));

// Test 2: Base64 with delimiter
console.log('\n2. Base64 with delimiter [K$]:');
const multiString = 'String1[K$]String2[K$]String3';
const base64Multi = Buffer.from(multiString).toString('base64');
console.log('Original:', multiString);
console.log('Base64:', base64Multi);
console.log('Decoded:', ASDeobfuscator.decode(base64Multi));

// Test 3: Source format
console.log('\n3. Source format:');
const sourceTest = 'source[' + base64Multi + ']';
console.log('Source format:', sourceTest);
console.log('Decoded:', ASDeobfuscator.decode(sourceTest));

// Test 4: Encoding back
console.log('\n4. Encoding back:');
const strings = ['Hello', 'World', 'Test'];
const encoded = ASDeobfuscator.encodeSource(strings, '[K$]');
console.log('Original strings:', strings);
console.log('Encoded:', encoded);
console.log('Decoded back:', ASDeobfuscator.decode(encoded));

// Test 5: Plain text
console.log('\n5. Plain text:');
const plainText = 'line1\nline2\n\nline3';
console.log('Plain text:', plainText);
console.log('Decoded:', ASDeobfuscator.decode(plainText));

console.log('\n=== All tests completed ===');
