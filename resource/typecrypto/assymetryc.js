const Variables = require('./variables');

class Assymetryc extends Variables {
  constructor() { super(); }

  set_keys() {
    return this.crypto.generateKeyPairSync('rsa', {
      modulusLength: 8192,
      publicExponent: 0x10001,

      publicKeyEncoding: {
        type: 'pkcs1',
        format: 'pem'
      },
      privateKeyEncoding: {
        type: 'pkcs1',
        format: 'pem',
        cipher: 'aes-256-cbc',
        passphrase: ''
      }
    });
  }

  verify(key) {
    return /BEGIN RSA PRIVATE KEY/g.test(key) ? 'private': 'public';
  }

  encrypt(key, data) {
    let typekey = this.verify(key);

    if (typekey == 'private') return this.crypto.privateEncrypt(key, Buffer.from(data));
    else                      return this.crypto.publicEncrypt(key, Buffer.from(data));
  }

  decrypt(key, data, passphrase) {
    let typekey = this.verify(key);

    if (typekey == 'private') return this.crypto.privateDecrypt({ key: key, passphrase: passphrase || '' }, Buffer.from(data));
    else                      return this.crypto.publicDecrypt(key, Buffer.from(data));
  }

  listen() {
    
  }
}

module.exports = Assymetryc;