const Util = require('./util');

class Validator extends Util {
  failed = false;
  failedFields = {};

  constructor(data, rules, message) {
    super();

    this.data = data;
    this.rules = rules;
    this.message = message;
  }

  fails() {
    return this.failed;
  }

  errorResult() {
    return {
      code: 400,
      message: 'bad request',
      result: {
        error: this.failedFields
      }
    };
  }

  getMessage(field, rule) {
    let existsRules = this.module.isObject(this.message);
    let message = '';

    switch (rule) {
      case 'required':
        message = (existsRules && this.message[field] && this.message[field][rule]) ? this.message[field][rule] : `field '${field}' is required`; break;
      case 'array':
        message = (existsRules && this.message[field] && this.message[field][rule]) ? this.message[field][rule] : `field '${field}' is not array`; break;
      case 'object':
        message = (existsRules && this.message[field] && this.message[field][rule]) ? this.message[field][rule] : `field '${field}' is not object`; break;
      case 'interger':
        message = (existsRules && this.message[field] && this.message[field][rule]) ? this.message[field][rule] : `field '${field}' is not number`; break;
      case 'string':
        message = (existsRules && this.message[field] && this.message[field][rule]) ? this.message[field][rule] : `field '${field}' is not string`; break;
      case 'date':
        message = (existsRules && this.message[field] && this.message[field][rule]) ? this.message[field][rule] : `field '${field}' is not date`; break;
      case 'boolean':
        message = (existsRules && this.message[field] && this.message[field][rule]) ? this.message[field][rule] : `field '${field}' is not boolean`; break;
    }

    if (/min\:/g.test(rule) || /max\:/g.test(rule)) message = `field '${field}' error ${rule}`;

    return message;
  }

  validateField(rule, value) {
    switch (rule) {
      case 'array':
        return !this.isArray(value)
      case 'object':
        return !this.isObject(value);
      case 'interger':
        return !this.isNumber(value);
      case 'string':
        return !this.isString(value);
      case 'datetime':
        return !this.isDateTime(value);
      case 'date':
        return !this.isDate(value);
      case 'time':
        return !this.isTime(value);
      case 'email':
        return !this.isEmail(value);
      case 'boolean':
        return !this.isBoolean(value);
    }

    let isNumber = this.validateField('interger', value);
    let minValue = this.getNumber(rule);
    if (/min\:/g.test(rule)) {
      if (isNumber) return (value < minValue) ? true : false;
      else          return (value.length < minValue) ? true : false;
    }

    if (/max\:/g.test(rule)) {
      if (isNumber) return (value > minValue) ? true : false;
      else          return (value.length > minValue) ? true : false;
    }

    return true;
  }

  handle() {
    if (!this.module.isObject(this.rules)) throw new Error('');
    if (!this.module.isObject(this.data))  throw new Error('');

    for(let field in this.rules) {
      let rules = this.rules[field].split('|');

      if (this.in_array(rules, 'required') && this.data[field] === undefined) {
        this.failedFields[field] = this.getMessage(field, 'required');
        continue;
      }

      for(let rule of rules) {
        let failed = this.validateField(rule, this.data[field]);

        if (!failed) continue;
        this.failed = true;
        this.failedFields[field] = this.getMessage(field, rule);
      }
    }

    return this;
  }

  static make(all = {}, rules = {}, message = {}) {
    let model = new Validator(all, rules, message);
    return model.handle();
  }
}

module.exports = Validator;