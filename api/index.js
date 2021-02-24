const { RouterApi } = require('../resource');

module.exports = RouterApi()
.static('/', 'html')
.static('/js', 'js')
.static('/css', 'css')
.use(
  RouterApi()
    .prefix('teste')
    .get('/', 'RootController@get')
).router;