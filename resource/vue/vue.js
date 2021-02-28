class Vue {
  model = '';
  police = '';

  constructor() { }

  singularLabel() {
    let className = this.constructor.name;
    return className;
  }

  pluralLabel() { 
    let className = this.constructor.name;
    return className + 's';
  }

  fields(request) {
    return [];
  }
}

module.exports = Vue;