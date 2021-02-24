const Storage = require('./storage');

class Cache {
  _storage = new Storage();

  constructor() {}

  static get(key) {
    let cache = new this();
    return cache.get(key);
  }

  get(key) {
    let data = this._storage.disk('cache', '').find({ filename: `${key}.json`, encoding: 'utf-8', parser: 'json' });
    return data;
  }

  static set(key, value) {
    let cache = new this();
    return cache.set(key, value);
  }

  set(key, value) {
    let data = this.get(key);

    if (data) value = Object.assign(data, value);
    this._storage.disk('cache', '').find({ filename: `${key}.json`, encoding: 'utf-8', parser: 'json', value: value });
  }
}

module.exports = Cache;