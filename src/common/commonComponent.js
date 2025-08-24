import * as CryptoJS from "crypto-js";

export function emailValidation(emailId) {
  if (!emailId || emailId === "") return false;
  const regex =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  if (regex.test(emailId) === false) return false;
  return true;
}

export const encryptedPayload = (requestBody) => {
  let encryptedRequestBody;
  const requestBodyString = JSON.stringify(requestBody);
  encryptedRequestBody = CryptoJS.AES.encrypt(
    requestBodyString,
    "secret_key"
  ).toString();
  return encryptedRequestBody;
};
