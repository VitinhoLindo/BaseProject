const Connector = require('./connector');

class Orm {

  table = "";
  fields = [];
  relation = {};

  constructor() {
    const Builder = require('./builder');
    const Connector = require('./connector');

    this.builder = new Builder();
    this.connector = new Connector();
  }

  static _fields() {
    let model = new this();
    return model.fields;
  }

  toJSON() {
    let json = {};

    for(let field of this.fields)
      if (this[field] !== undefined) json[field] = this[field];

    return json;
  }

  static select(...args) {
    let model = new this();
    return model.select.apply(model, args);
  }

  select(...args) {
    this.builder.select(args);
    return this;
  }

  static orderBy(arg = { column: '', order: '' }) {
    let model = new this();
    return model.orderBy(arg);
  }

  orderBy(arg = { column: '', order: '' }) {
    this.builder.order(arg);
    return this;
  }

  static groupBy(field) {
    let model = new this();
    return model.groupBy(field);
  }

  groupBy(field) {
    this.builder.group(field);
    return this;
  }

  static whereNot(arg = { column: '' }) {
    let model = new this();
    return model.whereNot(arg);
  }

  whereNot(arg = { column: '' }) {
    this.builder.where({ column: arg.column, comparison: 'is not', value: null });
    return this;
  }

  static where(arg = { column: '', comparison: '', value: '' }) {
    let model = new this();
    return model.where(arg);
  }

  where(arg = { column: '', comparison: '', value: '' }) {
    this.builder.where(arg);
    return this;
  }

  static async find(id) {
    let model = new this();
    return model.find(id);
  }

  async find(id) {
    this.where({ column: 'id', value: id });

    let MySqlReader = await this.get();
    return MySqlReader.first();
  }

  static async get() {
    let model = new this();
    return model.get();    
  }

  async get() {
    let query = this.builder.buildReader(this.table || '');
    return await this.connector.ExecuteReader({
      query,
      model: this
    });
  }

  static async insertGetId(json = {}) {
    let model = new this();

    let query = model.builder.buildInsert(json, model.fields, model.table);
    return model.connector.ExecuteNonQuery({
      query
    });
  }
  
  static async create(json = {}) {
    let model = new this();
    
    let query = model.builder.buildInsertModel(model, json);
    let id = await model.connector.ExecuteNonQuery({
      query
    });
    return (model.id = id) && (model);
  }

  async delete() {
    if (!this.id) return false;

    this.where({ column: 'id', value: this.id });
    let query = this.builder.buildDelete(this.table);

    await this.connector.ExecuteNonQueryDeleteOrUpdate({
      query
    });
    return true;
  }

  async save() {
    let query = this.builder.buildUpdateModel(this);

    await this.connector.ExecuteNonQueryDeleteOrUpdate({
      query
    });
  }
}

module.exports = Orm;