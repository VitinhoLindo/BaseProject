class Collection {
  original = [];

  constructor(data = [], model) {
    this.set(model, data);
  }

  set(model, data) {
    let rows = [];

    for(let row of data) {
      const _model = new model();

      for(let field of _model.fields)
        _model[field] = row[field] || null;

      rows.push(_model);
    }

    this.original = rows;
  }

  first() {
    return this.original[0];
  }

  last() {
    let len = this.original.length;
    len = (len - 1 < 0) ? 0 : len - 1;
    return this.original[len];
  }

  count() {
    return this.original.length;
  }

  toArray() {
    return this.original.map(function (model) {
      return model.toJSON();
    });
  }
}

module.exports = Collection;