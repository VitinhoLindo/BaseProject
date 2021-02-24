const Storage = require('./storage');

class Middleware {
  _storage = new Storage();
  _express = require('express');
  _app     = this._express();

  constructor() {}

  router() {
    this._app.use(Storage.require('api'));
  }

  get() {
    this.router();
    return this._app;
  }

  static get() {
    let middleware = new this();
    return middleware.get();
  }
}

module.exports = Middleware;