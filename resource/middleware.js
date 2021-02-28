const Storage = require('./storage');
const Vue = require('./vue/vue-router');

class Middleware {
  _storage = new Storage();
  _express = require('express');
  _app     = this._express();

  constructor() {}

  router() {
    this._app.use(Storage.require('api'));
  }

  vue() {
    this._app.use(Vue());
  }

  get() {
    this.router();
    this.vue();

    return this._app;
  }

  static get() {
    let middleware = new this();
    return middleware.get();
  }
}

module.exports = Middleware;