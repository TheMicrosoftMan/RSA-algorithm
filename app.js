const bigInt = require("big-integer");

randomPrime = (bits) => {
    const min = bigInt.one.shiftLeft(bits - 1);
    const max = bigInt.one.shiftLeft(bits).prev();
    while (true) {
      let p = bigInt.randBetween(min, max);
      if (p.isProbablePrime(256)) {
        return p;
      } 
    }
  }

encrypt = (encodedMsg, {e, n}) => {
  let arr = [];
  for (let i = 0; i < encodedMsg.length; i+=2) {
    arr.push(bigInt(encodedMsg.substr(i, 2)).modPow(e, n))
  }
  return arr;
}

showEncrypt = arr => {
  let str = "";
  arr.forEach(el => {
    str += el.toString();
  });
  return str;
}

decrypt = (encryptedMsg, {d, n}) => {
  let dec = "";
  for (let i = 0; i < encryptMessage.length; i++) {
    dec += bigInt(encryptedMsg[i]).modPow(d, n).toString();
  }
  return dec; 
}

let p = randomPrime(10);
let q = randomPrime(10);
let n = p.multiply(q);
let eiler = bigInt.lcm(p.prev(), q.prev());
let e = bigInt(65537);
let d = e.modInv(eiler);

let publicKey = {e, n};
let privateKey = {d, n};

console.log('n:', n.toString());
console.log('d:', d.toString());
console.log('e:', e.toString());

let message = "12345";
console.log(`Message: ${message}`);


let encryptMessage = encrypt(message, publicKey);
console.log(`Encrypted: ${showEncrypt(encryptMessage)}`);

let decryptMessage = decrypt(encryptMessage, privateKey)
console.log(`Decrypted: ${decryptMessage.toString()}`);