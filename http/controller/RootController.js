const RootService = require('../service/RootService');

class RootController extends RootService {
  constructor(request, response) { super(request, response); }

  async get() {
    return this.defaultResponse({
      message: 'Success',
      code: 200,
      result: {}
    });
  }

  static instance(request, response) {
    return new RootController(request, response);
  }
}

module.exports = RootController;