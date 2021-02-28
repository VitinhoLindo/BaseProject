const { Router, static } = require('express');
const Storage = require('./storage');
const Util = require('./util')

const RouterApi = function () {
  return {
    prefixUrl: null,
    storage: new Storage(),
    util: new Util(),
    router: Router(),
    url: function (url = '') {
      if (typeof url !== 'string') throw new Error(`url type is not string`);
      let len = url.length;

      if (url.substr(0,1) !== '/') url = `/${url}`;
      if (url.substr(len) === '/') url = url.substr(0, len);

      return url;
    },
    responseHeader(headers = {}) {
      this.router.use((request, response, next) => {
        for (let key in headers)
          response.setHeader(key, headers[key]);
        next();
      });

      return this;
    },
    static(url, path) {
      this.router.use(
        url,
        static(
          this.storage._path.join_path(
            this.storage._path.get('public'),
            path
          )
        )
      );
      return this;
    },
    usePrefix() {
      return typeof this.prefixUrl == 'string';
    },
    prefix(prefix) {
      this.prefixUrl = this.url(prefix);
      return this;
    },
    use(...args) {
      for(let routerApi of args) {
        if (routerApi.usePrefix()) 
          this.router.use(routerApi.prefixUrl, routerApi.router);
        else 
          this.router.use(routerApi.router);
      }
      return this;
    },
    sliptControllerArg(controllerString = '') {
      let [ controllerClass, functionName ] = controllerString.split('@');

      if (!controllerClass) throw new Error('');
      if (!functionName)    throw new Error('');

      if (/\/|\\/g.test(controllerClass) == false) {
        let pathFile = this.storage._path.join_path(
          this.storage._path.get('controller'),
          controllerClass
        );
        controllerClass = this.storage.require(pathFile, false);
      } else {
        controllerClass = this.storage.require(controllerClass, false);
      }

      return {
        controller: controllerClass,
        functionName: functionName
      }
    },
    getArgs([ url, controller ]) {
      if (typeof url !== 'string') throw new Error(``);
      if (typeof controller !== 'string') throw new Error(``);

      return {
        url: this.url(url),
        ...(this.sliptControllerArg(controller))
      };
    },
    setRouter(method, { url, controller, functionName }) {
      let prototype = this.util.getClassMethods(controller);
      if (!this.util.in_array(prototype, 'instance')) throw new Error(`
        code (2): static function instance is not defined
                  please create static function instance for return instance class
        ClassName: ${controller.constructor.name}
      `);

      let instance = controller.instance();
          prototype = this.util.getClassMethods(controller.instance());
      if (!this.util.in_array(prototype, functionName)) throw new Error(`
        code (2): function name is not defined in ControllerClass
        ClassName: '${instance.constructor.name}'
        functionName: '${functionName}'
      `);

      this.router[method](url, (request, response) => {
        controller.instance(request, response)[functionName]();
      });
    },
    get    (...args) { this.setRouter('get', this.getArgs(args));     return this; },
    post   (...args) { this.setRouter('post', this.getArgs(args));    return this; },
    put    (...args) { this.setRouter('put', this.getArgs(args));     return this; },
    delete (...args) { this.setRouter('delete', this.getArgs(args));  return this; },
    options(...args) { this.setRouter('options', this.getArgs(args)); return this; }
  }
}

module.exports = RouterApi;