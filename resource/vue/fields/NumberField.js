const BaseField = require('./BaseField')

class NumberField extends BaseField {
  fieldName = 'number-field';
  value = 0;
  min = 0;
  max = 999999;

  constructor(label, field) { super(label, field); }

  max(value) {
    this.max = value;
    return this;
  }

  min(value) {
    this.min = value;
    return this;
  }

  get(value, util) {
    return {
      name: this.fieldName,
      label: this.label,
      field: this.field,
      direction: this.direction,
      value: (value[this.field]) ? value[this.field] : this.value,
    }
  }

  static make(label, field) {
    return new NumberField(label, field);
  }
}

module.exports = NumberField;