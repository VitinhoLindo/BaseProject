class Variables {
  crypto = require('crypto');

  rsa = {
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
  };

  hashAlgorithm = 'sha512';

  constructor() {}
}

module.exports = Variables;