const Path = require('./path');

class Storage {
  _fs   = require('fs');
  _path = new Path();

  constructor() {}

  exists(pathstring = '') {
    let path = this._path.join_path(this._path.get(), pathstring);
    return {
      status: this._fs.existsSync(path),
      path: path
    };
  }

  is_dir(pathstring = '') {
    let exists = this.exists(pathstring);
    if (!exists.status) return exists;

    let stat = this._fs.statSync(exists.path);
    return {
      status: stat.isDirectory(),
      path: exists.path
    };
  }

  is_file(pathstring = '') {
    let exists = this.exists(pathstring);
    if (!exists.status) return exists;

    let stat = this._fs.statSync(exists.path);
    return {
      status: stat.isFile(),
      path: exists.path
    };
  }

  parseContent(type, value, parser) {
    switch (parser) {
      case 'json':
        return (type == 'write') ? JSON.stringify(value) : JSON.parse(value);
      default:
        return value;
    }
  }

  static disk(...args) {
    let storage = new this();
    return storage.disk(args[0], args[1]);
  }

  mkdir(path) {
    this._fs.mkdirSync(path);
  }

  disk(path = '', type = 'public') {
    const construct = function (storage = new Storage(), args = { path: '', type }) {
      return {
        save: function (arg = { filename: '', value: '', parser: '', encoding: 'utf-8' }) {
          storage.set({
            path: args.path, 
            filename: arg.filename,
            encoding: arg.encoding,
            value: arg.value,
            parser: arg.parser
          });
        },
        find: function (arg = { filename: '', parser: '', encoding: 'utf-8' }) {
          return storage.get({
            path: args.path,
            filename: arg.filename,
            parser: arg.parser,
            encoding: arg.encoding
          });
        }
      };
    }

    let exists = this.exists(type);
    if (!exists.status) this.mkdir(exists.path);
    exists     = this.exists(this._path.join_path(type, path));
    if (!exists.status) this.mkdir(exists.path);

    return construct(this, { 
      path: this._path.join_path(type, path),
      type 
    });
  }

  static require(path, use) {
    let _this = new this();
    return _this.require(path, use);
  }

  require(path, use = true) {
    if (use) {
      return require(this._path.join_path(this._path.get('root'), path));
    } else {
      return require(path);
    }
  }

  get({ path = '', filename = '', encoding = 'utf-8', parser }) {
    let exists = this.exists(path), value;
    if (!exists.status) throw new Error('File Reader: Path is not exists');
    exists = this.exists(this._path.join_path(path, filename));
    if (!exists.status) return null;

    value = this._fs.readFileSync(
      exists.path, 
      encoding
    );

    return this.parseContent('read', value, parser);
  }

  set({ path = '', filename = '', value = '', encoding = 'utf-8', parser }) {
    let exists = this.exists(path);
    value      = this.parseContent('write', value, parser);
    if (!exists.status) throw new Error('Write File: Path is not exists');

    this._fs.writeFileSync(
      this._path.join_path(exists.path, filename),
      value,
      { encoding }
    )
  }
}

module.exports = Storage;