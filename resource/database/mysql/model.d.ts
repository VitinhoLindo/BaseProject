import Orm from './orm';

class Model extends Orm {
  static instance(): Model;
}

export = Model;