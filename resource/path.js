const windows = {
  dir: '',
  path: '\\',
  http: '\\http',
  controller: '\\controller',
  private: '\\private',
  public: '\\public'
}

const linux = {
  dir: '',
  path: '/',
  http: '/http',
  controller: '/controller',
  private: '/private',
  public: '/public'
}

class Path {
  _process = require('process');
  _path = require('path');
  _paths = linux;

  constructor() {
    this.set();
  }

  plataformDir() {
    switch (this._process.platform) {
      case 'win32':
        return windows;
      default:
        return linux;
    }
  }

  exec_dir(argv = []) {
    return this.path_dir(argv[1]);
  }

  path_dir(path) {
    let { dir } = this._path.parse(path);
    return dir;
  }

  join_path(...args) {
    return this._path.join.apply(null, args);
  }

  set() {
    this._paths = this.plataformDir();
    this._paths.dir = this.exec_dir(this._process.argv);
  }

  get(getstring = 'root') {
    switch (getstring) {
      case 'http':
        return this.join_path(this.get('root'), this._paths.http);
      case 'controller':
        return this.join_path(this.get('http'), this._paths.controller);
      case 'private':
        return this.join_path(this.get('root'), this._paths.private);
      case 'public':
        return this.join_path(this.get('root'), this._paths.public);
      case 'root':
      default:
        return this.join_path(this._paths.dir, this._paths.path);
    }
  }
}

module.exports = Path;