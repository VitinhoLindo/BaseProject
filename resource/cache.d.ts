class Cache {
  _storage: typeof import ('./storage');

  get(key: string): any;
  set(key: string, value: object): void;
}

export = Cache;