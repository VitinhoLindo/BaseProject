import Model from './model';

class Collection {
  original: any[];

  constructor(data: any[], model: Model): void;

  toArray(): object[];
  set(model: Model, data: any[]): void;
  first(): Model;
  last(): Model;
  count(): number;
}

export = Collection;