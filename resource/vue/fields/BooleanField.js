const BaseField = require('./BaseField');

class BooleanField extends BaseField {
  fieldName = 'boolean-field';
  value = false;

  constructor(label, field) { super(label, field); }

  get(value, util) {
    return {
      name: this.fieldName,
      label: this.label,
      field: this.field,
      direction: this.direction,
      value: (value[this.field]) ? value[this.field]: this.value
    }
  }

  static make(label, field) {
    return new BooleanField(label, field);
  }
}

module.exports = BooleanField;