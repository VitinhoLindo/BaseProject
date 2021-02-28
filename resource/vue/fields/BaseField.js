class BaseField {
  field = '';
  label = '';
  direction = 'row';

  constructor(label, field) {
    this.field = field;
    this.label = label;
  }

  direction(direction = '') {
    this.direction = direction;
    return this;
  }
}

module.exports = BaseField;