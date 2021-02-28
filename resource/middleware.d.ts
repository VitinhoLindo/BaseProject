class Middleware {
  _storage = typeof import('./storage');
  _express = import('express');
  _app     = typeof import('express');

  router(): void;
  vue(): void;

  get(): typeof import('express');
  static get(): typeof import('express');
}

export = Middleware;