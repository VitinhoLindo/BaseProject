const Path = require('../path');
const Router = require('../router');

const vueRouter = function () {
  let path = new Path();

  const builder = path.join_path(__dirname, '/vue-builder');
  const prefix = Router().prefix('resource')
    .get('/', `${builder}@list`)
    .get('/:resource', `${builder}@get`)
    .post('/:resource', `${builder}@post`)
    .put('/:resource', `${builder}@put`)
    .delete('/:resource', `${builder}@delete`);
  const api = Router().use(prefix);

  return api.router;
}

module.exports = vueRouter;