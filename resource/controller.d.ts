import { request, response } from 'express'
import Storage from './storage'
import Crypto from './crypto'
import Cache from './cache'
import Validator from './validator'
import Util from './util'

interface DefaultResponseArgument {
  message?: string;
  code?: number;
  result?: any;
}

class Controller {
  request: typeof request;
  response: typeof response;
  storage: Storage;
  crypto: Crypto;
  cache: Cache;
  Util: Util;
  Validator: Validator;

  constructor(request: request, response: response): void;

  all(): { [key: string]: any };
  currentTime(date: Date): number;
  sendJSON(json: object): void;
  status(code: number): void;
  end(): void;
  defaultResponse(arg: DefaultResponseArgument): void;
  error(error: any): void;
}

export = Controller;