const BaseField = require('./BaseField')

class TimeField extends BaseField {
  fieldName = 'time-field';
  value = new Date();

  constructor(label, field) { super(label, field); }

  get(value, util) {
    return {
      name: this.fieldName,
      label: this.label,
      field: this.field,
      direction: this.direction,
      value: (value[this.field])? value[this.field]: this.value
    }
  }

  static make(label, field) {
    return new TimeField(label, field);
  }
}

module.exports = TimeField;