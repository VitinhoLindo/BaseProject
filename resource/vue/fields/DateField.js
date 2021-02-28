const BaseField = require('./BaseField')

class DateField extends BaseField {
  fieldName = 'date-field';
  value = new Date();
  maxDays = null;
  minDays = null;

  constructor(label, field) { super(label, field); }

  max(days) {
    this.maxDays = days;
  }

  min(days) {
    this.minDays = days;
  }

  using() {
    let using = {};

    if (this.maxDays !== null) using['max-days'] = this.maxDays;
    if (this.minDays !== null) using['min-days'] = this.minDays;

    return (Object.keys(using).length) ? using: undefined;
  }

  get(value, util) {
    return {
      name: this.fieldName,
      label: this.label,
      field: this.field,
      direction: this.direction,
      value: (value[this.field])? value[this.field]: this.value,
      using: this.using()
    }
  }

  static make(label, field) {
    return new DateField(label, field);
  }
}

module.exports = DateField;