import Model from './model'

declare module "builder" {
  type WhereComparison = '=' | '>=' | '<=' | '!=';
  type OrderByDirectrion = 'DESC' | 'ASC';
  
  interface WhereNotArguments {
    column: string;
  }

  interface WhereArguments {
    column: string;
    comparison?: WhereComparison;
    value: any;
  }
  
  interface OrderByArguments {
    column: string;
    order: OrderByDirectrion;
  }
  
  interface InsertFieldsAndValues {
    fieldsInsert: string;
    valuesInsert: string;
  }
  
  class Builder {
    mysql: typeof import('mysql2');
    selectFields: string[];
    whereFields: string[];
    groupBy: string;
    orderBy: string;
  
    splitFields(field: string): string[];
    fieldValue(strings: string[]): string;
    select(args: string[]): void;
    where(arg: WhereArguments): void;
    group(field: string): void;
    order(arg: OrderByArguments): void;
    selectQuery(): string;
    whereQuery(): string;
    buildReader(table: string): string;
    buildDelete(table: string): string;
    insertFieldsAndValues(fields: string[], model: Model) : InsertFieldsAndValues;
    insertFieldsAndValuesModel(fields: string[], model: Model) : InsertFieldsAndValues;
    updateField(model: Model): string;
    buildUpdateModel(model: Model): string;
    buildInsertModel(model: Model, json: object): string;
    buildInsert(model: Model, fields: string[], table: string): string;
  }
}