const BaseField = require('./BaseField')

class SelectField extends BaseField {
  fieldName = 'select-field';
  value = null;
  optionsFunction = function () { return {} };

  constructor(label, field) { super(label, field); }

  options(callback) {
    if (typeof callback == 'function') this.optionsFunction = callback;
    return this;
  }

  async get(value, util) {
    return {
      name: this.fieldName,
      label: this.label,
      field: this.field,
      type: this.typeField,
      direction: this.direction,
      value: (value[this.field])? value[this.field]: this.value,
      options: await this.optionsFunction()
    };
  }

  static make(label, field) {
    return new SelectField(label, field);
  }
}

module.exports = SelectField;