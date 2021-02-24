const Orm = require('./orm');

class Model extends Orm {
  constructor() { super(); }

  static instance() { return new Model(); }
}

module.exports = Model;