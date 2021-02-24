const Config = require('./config');
const Middleware = require('./middleware');

class Server {
  _config     = new Config();
  _middleware = new Middleware();

  constructor() {}

  static listen(callback) {
    let _server = new this();

    _server._config.load();
    const proxy = _server._config.createServer(_server._middleware.get());

    proxy.listen(_server._config.serverListen(), () => {
      if (callback) 
        callback.apply(_server, _server._config.serverListenCallback());
    });
  }
}

module.exports = Server;