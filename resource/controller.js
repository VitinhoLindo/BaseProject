const Storage   = require('./storage');
const Crypto    = require('./crypto');
const Cache     = require('./cache');
const Validator = require('./validator');
const Util      = require('./util');

class Controller {
  storage   = new Storage();
  crypto    = new Crypto();
  cache     = new Cache();
  util      = new Util();
  Validator = Validator;

  constructor(request, response) {
    this.request  = request;
    this.response = response;
  }

  all() {
    try {
      return Object.assign({}, this.request.query, this.request.params, this.request.body);
    } catch (error) { return {}; }
  }
  currentTime(date = new Date()) { return date.getTime(); }  
  sendJSON(json) { this.response.json(json); }
  end() { this.response.end(); }
  status(code) { this.response.status(code || 200); }

  defaultResponse(arg = { message: undefined, code: undefined, result: undefined }) {
    if (!arg.code) arg.code = 404;
    arg.status = arg.code >= 200 && arg.code < 300 ? 'success': 'error';
    if (!arg.message) arg.message = 'Don\'t found';

    this.status(200);
    this.sendJSON({
      message: arg.message,
      code: arg.code,
      result: arg.result,
      status: arg.status,
      time: this.currentTime()
    });
    this.end();
  }

  error(error) {
    if (this.util.isObject(error)) return this.defaultResponse(error);
    return this.defaultResponse({ code: 500, message: 'internal server error' });
  }
}

module.exports = Controller;