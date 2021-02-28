import UtilModule from 'util'

class Util {
  module: UtilModule;

  static in_array(array: any[], value: any): boolean;
  in_array(array: any[], value: any): boolean;
  /**
   * @param classInstance 
   * 
   * return methods class
   */
  static getClassMethods(classInstance: any): string[];
  /**
   * @param classInstance 
   * 
   * return methods class
   */
  static getClassMethods(classInstance: any): string[];
  getNumber(value: string): number;
  isUndefined(value: any): boolean;
  isNull(value: any): boolean;
  isNullOrUndefined(value: any): boolean;
  isString(value: any): boolean;
  isDateTime(value: any): boolean;
  isDate(value: any): boolean;
  isTime(value: any): boolean;
  isBoolean(value: any): boolean;
  isNumber(value: any): boolean;
  isObject(value: any): boolean;
  isArray(value: any): boolean;
  isEmail(value: any): boolean;
}

export = Util;