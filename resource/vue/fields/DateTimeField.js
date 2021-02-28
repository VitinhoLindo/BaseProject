const BaseField = require('./BaseField')

class DateTimeField extends BaseField {
  fieldName = 'datetime-field';
  value = new Date();
  maxDays = null;
  minDays = null;
  maxHours = null;
  minHours = null;

  constructor(label, field) { super(label, field); }

  using() {
    let using = {};

    if (this.maxDays !== null) using['max-days'] = this.maxDays;
    if (this.minDays !== null) using['min-days'] = this.minDays;
    if (this.maxHours !== null) using['max-hours'] = this.maxHours;
    if (this.minHours !== null) using['min-hours'] = this.minHours;

    return (Object.keys(using).length) ? using: undefined;
  }

  get(value, util) {
    return {
      name: this.fieldName,
      label: this.label,
      field: this.field,
      direction: this.direction,
      value: (value[this.field])? value[this.field] :this.value,
      using: this.using()
    }
  }

  static make(label, field) {
    return new DateTimeField(label, field);
  }
}

module.exports = DateTimeField;