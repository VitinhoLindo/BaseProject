class Vue {
  model: any;
  policie?: any;

  singularLabel(): string;
  pluralLabel(): string;
  async fields(): any[];
}

export = Vue