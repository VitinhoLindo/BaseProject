const BaseField = require('./BaseField');

class StringField extends BaseField {
  fieldName = 'string-field';
  value = '';
  typeField = 'text';

  constructor(label, field) { super(label, field); }

  type(string) {
    this.typeField =  string;
    return this;
  }

  get(value, util) {
    return {
      name: this.fieldName,
      label: this.label,
      field: this.field,
      type: this.typeField,
      direction: this.direction,
      value: (value[this.field])? value[this.field]: this.value
    }
  }

  static make(label, field) {
    return new StringField(label, field);
  }
}

module.exports = StringField;