class Builder {
  mysql = require('mysql2');
  selectFields = [];
  whereFields = [];
  groupBy = "";
  orderBy = "";

  constructor() {}

  splitFields(field = '') {
    return field.split('.').filter(a => (a) ? true : false);
  }

  fieldValue(strings = ['']) { 
    let field = '';

    for(let index in strings) {
      if (index != 0) field += `.\`${strings[index]}\``;
      else            field +=  `\`${strings[index]}\``;
    }
    
    return field;
  }

  select(args = []) {
    if (!args.length) return;

    if (args.length == 1) {
      this.selectFields.push(
        this.fieldValue(this.splitFields(args[0]))
      );
    } else {
      this.selectFields.push(
        `${this.fieldValue(this.splitFields(args[0]))}` +
        ` as ${this.fieldValue([args[1]])}`
      );
    }
  }

  where(arg = { column: '', comparison: '', value: '' }) {
    if (!arg.comparison) arg.comparison = '=';

    this.whereFields.push(
      `${this.fieldValue(this.splitFields(arg.column))} ${arg.comparison} ${this.mysql.escape(arg.value)}`
    );
  }

  group(field = '') {
    this.groupBy = `GROUP BY ${this.fieldValue(this.splitFields(field))}`;
  }

  order(arg = { column: '', order: '' }) {
    if (!arg.order) arg.order = 'DESC';
    this.orderBy = `ORDER BY ${this.fieldValue(this.splitFields(arg.column))} ${arg.order}`;
  }

  selectQuery() {
    let query = '';
    let len = this.selectFields.length;
    
    for (let x in this.selectFields) {
      query += `${this.selectFields[x]}`;

      if (x < len -1) query += `, `;
      else            query += ` `;
    }

    this.selectFields = [];
    return query ? query : '* ';
  }

  whereQuery() {
    let query = '';
    let len = this.whereFields.length;

    for(let x in this.whereFields) {
      query += `${this.whereFields}`;
      
      if (x < len - 1) query += ' AND ';
    }

    this.whereFields = [];
    return query;
  }

  insertFieldsAndValues(fields = [], model) {
    let fieldsInsert = '';
    let valuesInsert = '';

    for(let x in fields) {
      let field = fields[x];

      if (!model[field]) model[field] = null;
      fieldsInsert += this.fieldValue(this.splitFields(field));
      valuesInsert += this.mysql.escape(model[field]);

      if (x < fields.length - 1) {
        fieldsInsert += ', ';
        valuesInsert += ', ';
      }
    }

    return { fieldsInsert, valuesInsert };
  }

  insertFieldsAndValuesModel(model, json) {
    let fieldsInsert = '';
    let valuesInsert = '';

    for(let field of model.fields) {
      if (!json[field]) json[field] = null;
      model[field] = json[field];
    }

    for(let x in model.fields) {
      let field = model.fields[x];

      fieldsInsert += this.fieldValue(this.splitFields(field));
      valuesInsert += this.mysql.escape(model[field]);

      if (x < model.fields.length - 1) {
        fieldsInsert += ', ';
        valuesInsert += ', ';
      }
    }

    return { fieldsInsert, valuesInsert };
  }

  buildReader(table = '') {
    let query = `SELECT ` + 
                `${this.selectQuery()}` + 
                `FROM ${this.fieldValue(this.splitFields(table))}`;
    const groupBy = this.groupBy.substr();
    const orderBy = this.orderBy.substr();
    const where   = this.whereQuery();
    this.groupBy = "";
    this.orderBy = "";

    if (where)   query += ` WHERE (${where})`;
    if (groupBy) query += ` ${groupBy}`;
    if (orderBy) query += ` ${orderBy}`;
    return `${query};`;
  }

  updateField(model) {
    let query = '';

    for(let x in model.fields) {
      let field = model.fields[x];
      if (field == 'id') continue;
      query += `${this.fieldValue(this.splitFields(field))} = ` + `${this.mysql.escape(model[field])}`;

      if (x == model.fields.length - 1) continue;
      query += ', ';
    }

    return query;
  }

  buildUpdateModel(model) {
    let query = `UPDATE ` +
                this.fieldValue(this.splitFields(model.table));
    this.where({ column: 'id', value: model.id })

    let where  = this.whereQuery();
    let fields = this.updateField(model);

    if (fields) query += ` SET ${fields}`;
    if (where)  query += ` WHERE (${where});`;

    return query;
  }

  buildInsertModel(model, json) {
    let query  = `INSERT INTO ` +
                 this.fieldValue(this.splitFields(model.table)) + ' ';
    let { fieldsInsert, valuesInsert } = this.insertFieldsAndValuesModel(model, json);
    return (query += `(${fieldsInsert}) VALUES (${valuesInsert});`);
  }

  buildInsert(model, fields, table) {
    let query  = `INSERT INTO ` +
                 this.fieldValue(this.splitFields(table)) + ' ';
    let { fieldsInsert, valuesInsert } = this.insertFieldsAndValues(fields, model);
    return (query += `(${fieldsInsert}) VALUES (${valuesInsert});`);
  }

  buildDelete(table) {
    let query = `DELETE FROM ` + 
                this.fieldValue(this.splitFields(table));
    let where = this.whereQuery();

    if (where) query += ` WHERE (${where});`;
    return query;
  }
}

module.exports = Builder;