import CryptoJS from "crypto-js";

export const decrypt = function (encryptStr: any, secret: string): string {
    encryptStr = CryptoJS.enc.Base64.parse(JSON.stringify(encryptStr));
    let encryptData = encryptStr.toString(CryptoJS.enc.Utf8);
    encryptData = JSON.parse(encryptData);
    let iv = CryptoJS.enc.Base64.parse(encryptData.iv);
    var decrypted = CryptoJS.AES.decrypt(encryptData.value,  CryptoJS.enc.Utf8.parse(secret), {
        iv : iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });
    return  CryptoJS.enc.Utf8.stringify(decrypted);
};

export const encrypt = function (data: any, secret: string): string {
    let iv = CryptoJS.lib.WordArray.random(16),
    key = CryptoJS.enc.Utf8.parse(secret);

    let options = {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    };
    let encrypted = CryptoJS.AES.encrypt(JSON.stringify(data), key, options).toString();
    
    const base64iv = CryptoJS.enc.Base64.stringify(iv);
    let result = JSON.stringify({
        iv: base64iv,
        value: encrypted,
        mac: CryptoJS.HmacSHA256(base64iv + encrypted, key).toString()
    })

    return CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(result));
};

