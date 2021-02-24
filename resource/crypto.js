const { Symmetryc, Asymmetryc, Hash } = require('./typecrypto')

class Crypto {
  constructor() {}

  static symmetryc() {
    let model = new this();
    return model.symmetryc();
  }

  symmetryc() {
    return new Symmetryc();
  }

  static assymetryc() {
    let model = new this();
    return model.asymmetryc();
  }

  asymmetryc() {
    return new Asymmetryc();
  }

  static hash(value) {
    let model = new this();
    return model.hash(value);
  }

  hash(value) {
    let hash = new Hash(value);
    return hash.update();    
  }
}

module.exports = Crypto;