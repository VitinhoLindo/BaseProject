const Storage = require('./storage');

class Config {
  _process = require('process');

  _server = {
    type: '',
    protocol: require('http'),
    ssl: {
      key: null,
      cert: null
    },
    config: {
      host: 'localhost',
      port: '3000'
    }
  }

  constructor() {}

  load() {
    try {
      require('dotenv').config();
    } catch (error) {
      throw new Error('plase run `npm run install`');
    }

    let config = Storage.require('app.js');

    if (config.http && config.http.useEnv) {
      this._server.type = (this._process.env.HTTP_PROTOCOL == 'https') ? 'https' : 'http';
      this._server.protocol = (this._process.env.HTTP_PROTOCOL == 'https') ? require('https') : require('http');
      if (this._process.env.HTTP_PROTOCOL == 'https') this._server.ssl = {
        key: this._process.env.HTTP_PROTOCOL == 'https' ? Storage.disk('ssl', '').find({
          filename: this._process.env.HTTP_KEY,
          encoding: 'utf-8'
        }) : '',
        cert: this._process.env.HTTP_PROTOCOL == 'https' ? Storage.disk('ssl', '').find({
          filename: this._process.env.HTTP_CERT,
          encoding: 'utf-8'
        }) : ''
      }
      this._server.config = {
        host: this._process.env.HTTP_HOST || 'localhost',
        port: this._process.env.HTTP_PORT || '3000'        
      }
    } else {
      this._server.type = (config.http && config.http.protocol == 'https') ? 'https' : 'http';
      this._server.protocol = (config.http && config.http.protocol == 'https') ? require('https') : require('http');
      if (config.http && config.http.protocol == 'https') this._server.ssl = {
        key: (config.http.key_path) ? Storage.disk('ssl', '').find({
          filename: config.http.key_path,
          encoding: 'utf-8'
        }) : '',
        cert: (config.http.key_path) ? Storage.disk('ssl', '').find({
          filename: config.http.cert_path,
          encoding: 'utf-8'
        }) : ''
      }
      this._server.config = {
        host: config.http.host || 'localhost',
        port: config.http.port || '3000'
      }
    }
  }

  serverListen() {
    return this._server.config;
  }

  serverListenCallback() {
    return [Object.assign({ protocol: this._server.type }, this._server.config)];
  }

  createServer(middleware) {
    const proxy = this._server.type == 'https' ?
      this._server.protocol.createServer(this._server.ssl, middleware):
      this._server.protocol.createServer(middleware);

    proxy.timeout = 12000;
    proxy.requestTimeout = 12000; 
    proxy.headersTimeout = 12000;
    proxy.keepAliveTimeout = 12000;

    return proxy;
  }
}

module.exports = Config;