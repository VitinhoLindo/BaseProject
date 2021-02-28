import Util from '../../util'

type Direction = 'row' | 'column';
type TypeValues = 'text' | 'email' | 'password';

interface UsingResource {
  'max-days'?: number;
  'min-days'?: number;
}

interface DefaultResource {
  name: string;
  label: string;
  field: string;
  type?: TypeValues;
  direction: string;
  value: any;
  using?: UsingResource;
  options?: any;
}

class Base {
  field: string;
  label: string;
  direction: string;

  constructor(label: string, field: string): void;
}

class BooleanField extends Base {
  fieldName: 'boolean-field';
  value: boolean;

  constructor(label: string, field: string): void;

  get(value: any, util: Util): DefaultResource;
  direction(direction: Direction): BooleanField;
  static make(label: string, field: string): BooleanField;
}

class DateField extends Base {
  fieldName: 'date-field';
  value: Date;
  maxDays: number;
  minDays: number;

  constructor(label: string, field: string): void;

  min(days: number): DateField;
  max(days: number): DateField;

  get(value: any, util: Util): DefaultResource;
  direction(direction: Direction): DateField;
  static make(label: string, field: string): DateField;
}

class DateTimeField extends Base {
  fieldName: 'datetime-field';
  value: Date;

  constructor(label: string, field: string): void;

  get(value: any, util: Util): DefaultResource;
  direction(direction: Direction): DateTimeField;
  static make(label: string, field: string): DateTimeField;
}

class TimeField extends Base {
  fieldName: 'time-field';
  value: Date;

  constructor(label: string, field: string): void;

  get(value: any, util: Util): DefaultResource;
  direction(direction: Direction): TimeField;
  static make(label: string, field: string): TimeField;
}

class NumberField extends Base {
  fieldName: 'string-field';
  value: number;
  
  constructor(label: string, field: string): void;
  
  min(value: number): NumberField;
  max(value: number): NumberField;
  
  direction(direction: Direction): NumberField;
  get(value: any, util: Util): DefaultResource;
  static make(label: string, field: string): NumberField;
}

class StringField extends Base {
  fieldName: 'string-field';
  value: string;
  typeField: string;

  constructor(label: string, field: string): void;

  type(string: TypeValues): StringField;
  get(value: any, util: Util): DefaultResource;
  direction(direction: Direction): NumberField;
  static make(label: string, field: string): StringField;
}

class SelectField extends Base {
  fieldName = 'select-field';
  value = null;
  optionsFunction: () => any;

  constructor(label: string, field: string): void;

  options(callback: () => any): SelectField; 
  get(value: any, util: Util): Promise<DefaultResource>;
  direction(direction: Direction): SelectField;
  static make(label: string, field: string): SelectField;
}

export = {
  BooleanField: BooleanField,
  DateField: DateField,
  DateTimeField: DateTimeField,
  TimeField: TimeField,
  NumberField: NumberField,
  StringField: StringField,
  SelectField: SelectField
}