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

let p = randomPrime(10);
let q = randomPrime(10);
let n = p.multiply(q);
let eiler = bigInt.lcm(p.prev(), q.prev());
let e = bigInt(65537);
let d = e.modInv(eiler);

let publicKey = {e, n};
let privateKey = {d, n};

let message = bigInt(123444);
console.log(`Message: ${message}`);

let encryptMessage = bigInt(message).modPow(publicKey.e, publicKey.n);
console.log(`Encrypted: ${encryptMessage.toString()}`);

let decryptMessage = bigInt(encryptMessage).modPow(privateKey.d, privateKey.n);
console.log(`Decrypted: ${decryptMessage.toString()}`);