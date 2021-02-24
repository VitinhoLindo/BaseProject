import { request, response } from 'express'
import Storage from './storage'
import Crypto from './crypto'
import Cache from './cache'

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

  constructor(request: request, response: response): void;

  currentTime(date: Date): number;
  sendJSON(json: object): void;
  status(code: number): void;
  end(): void;
  defaultResponse(arg: DefaultResponseArgument): void;
}

export = Controller;