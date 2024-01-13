// const crypto = require('crypto');
// import crypto from 'crypto';

// function encryptData(data) {
//   const algorithm = 'aes-192-cbc';
//   const key = crypto.scryptSync("thecyberworld", 'salt', 24);
//   const iv = crypto.randomBytes(16);

//   const cipher = crypto.createCipheriv(algorithm, key, iv);
//   let encrypted = cipher.update(data, 'utf8', 'hex');
//   encrypted += cipher.final('hex');

//   return encrypted;
// }

// export default encryptData;

import CryptoJS from "crypto-js";

function encryptData(data) {
    const encryptedData = CryptoJS.AES.encrypt(JSON.stringify(data), "thecyberhub").toString();
    return encryptedData;
}

export default encryptData;
