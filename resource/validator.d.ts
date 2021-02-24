import Util from './util'

interface ErrorResult {
  code: number;
  message: string;
  result: {
    error: { [key: string] : string }
  }
}

class Validator extends Util {
  field: boolean;
  failedFields: { [key : string]: string };

  contructor(data: object, rules: object, message: any | object): Validator;

  fails(): boolean;
  errorResult(): ErrorResult;
  getMessage(field: string, rule: string): string;
  validateField(rule: string, rule: string): boolean;
  handle(): void;
  static make(all: object, rule: object, message: any | object): Validator;
}

export = Validator;