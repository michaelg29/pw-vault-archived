export function encrypt(plaintext, key) {
    let key_arr = [];
    let n = key.length;

    // create integer array for key
    for (var i = 0; i < n; i++) {
        key_arr.push(key.charCodeAt(i));
    }

    let ciphertext = "";

    for (var i = 0, len = plaintext.length; i < len; i++) {
        ciphertext += String.fromCharCode(plaintext.charCodeAt(i) + key_arr[i % n]);
    }

    return ciphertext;
}

export function decrypt(ciphertext, key) {
    let key_arr = [];
    let n = key.length;

    // create integer array for key
    for (var i = 0; i < n; i++) {
        key_arr.push(key.charCodeAt(i));
    }

    let plaintext = "";

    for (var i = 0, len = ciphertext.length; i < len; i++) {
        plaintext += String.fromCharCode(ciphertext.charCodeAt(i) - key_arr[i % n]);
    }

    return plaintext;
}