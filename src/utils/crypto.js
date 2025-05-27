import CryptoJS from "crypto-js";

const secretKey = import.meta.env.VITE_CRYPTO_KEY;

export const encrypt = (data) => {
  return CryptoJS.AES.encrypt(data, secretKey).toString();
};

export const decrypt = (cipherText) => {
  const bytes = CryptoJS.AES.decrypt(cipherText, secretKey);
  return bytes.toString(CryptoJS.enc.Utf8);
};
