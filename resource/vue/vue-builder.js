const Controller = require('../controller');
const Storage = require('../storage');
const Util = require('../util');

class VueBuilder extends Controller {
  storage = new Storage();
  util = new Util();

  constructor(request, response) { super(request, response); }

  listResources() {
    return this.storage.disk('app', '')
      .list()
      .map((file) => {
        let info = this.storage._path.info(file);

        if (info.ext == '.js') return file;
        return null;
      }).filter((file) => file !== null);
  }

  getResources() {
    let pathResource = this.storage._path.get('resource');
    return this.listResources()
      .map((file) => {
        let filepath = this.storage._path.join_path(pathResource, file);
        return this.storage.require(filepath, false);
      });
  }

  getSingularLabels() {
    return this.getResources().map(function (resource) {
      let model = new resource(), 
          singular = model.singularLabel();

      return model.singularLabel();
    });
  }

  async list() {
    return this.defaultResponse({ 
      message: 'temporary broken', 
      code: 200, 
      result: {
        dirs: this.getSingularLabels()
      }
    });
  }

  searchResource(singular = '') {
    let resources = this.getResources();

    resources = resources.filter(function (resource) {
      return (new resource()).singularLabel() == singular;
    })

    if (!resources.length) throw { code: 404, message: 'dont found' };

    let resource = resources[0];
    return new resource();
  }

  getResourceFields(field) {
    return field.get();
  }

  filterKey(fields, key) {
    let field = fields.filter(function (_) {
      return _.field == key;
    });

    return field[0] || null;
  }

  async resourceFields(resource) {
    let model = new resource.model;
    let modelFields = resource.model._fields();
    let controller = {
      fields: await resource.fields(),
      values: await model.get()
    };

    controller.values = controller.values.toArray();
    const values = [];

    for(const value of controller.values) {
      let fields = controller.fields.slice();

      for(const y in fields) {
        let field = fields[y];
        fields[y] = await field.get(value, this.util);
      }

      values.push(fields);
    }

    return { fields: modelFields, values: values };
  }

  async get() {
    let data = this.all();
    try {
      if (!data.resource) throw { code: 400, message: 'bad request' };

      let fields = await this.resourceFields(
        this.searchResource(data.resource)
      );

      return this.defaultResponse({ message: 'temporary broken', code: 200, result: fields });
    } catch (error) {
      return this.error(error);
    }
  }

  async post() {
    return this.defaultResponse({ message: 'temporary broken', code: 200, result: this.all() });
  }

  async put() {
    return this.defaultResponse({ message: 'temporary broken', code: 200, result: this.all() });
  }

  async delete() {
    return this.defaultResponse({ message: 'temporary broken', code: 200, result: this.all() });
  }

  static instance(request, response) { return new VueBuilder(request, response); }
}

module.exports = VueBuilder;