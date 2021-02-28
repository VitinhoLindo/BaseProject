import { OrderByArguments, Builder, WhereNotArguments } from 'builder'
import Connector from './connector'
import Model from './model'
import Collection from './collection'

class Orm {
  table: string;
  fields: string[];
  relation: { [key: string] : Orm };
  connector: Connector;
  builder: Builder;

  static _fields(): string[];
  static select(args: string[]): Orm;
  select(args: string[]): Orm;
  static orderBy(arg: OrderByArguments): Orm;
  orderBy(arg: OrderByArguments): Orm;
  static groupBy(field: string): Orm;
  groupBy(field: string): Orm;
  static whereNot(arg: WhereNotArguments): Orm;
  whereNot(arg: WhereNotArguments): Orm;
  find(id: number): Model;
  static async insertGetId(json: object): number;
  static async create(json: object): Model;
  async delete(): boolean;
  async save(): void;
  static async get(): Collection;
  async get(): Collection;
}

export = Orm;