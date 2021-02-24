const Variables = require('./variables')

class Hash extends Variables {
  constructor(value) {
    super();
    this.value = value;
  }

  createHash() {
    return this.crypto.createHash(this.hashAlgorithm);
  }

  update() {
    return this.createHash().update(this.value).digest().toString('base64');
  }
}

module.exports = Hash;