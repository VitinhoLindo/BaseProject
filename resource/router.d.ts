import { Router } from 'express';
import Util from './util';
import Storage from './storage';
import Controller from './controller';

interface SplitController {
  controller: Controller;
  functionName: string;
}

interface GetArgs extends SplitController {
  url: string;
}

type MethodsRouter = 'get' | 'post' | 'put' | 'delete' | 'options';

class RouterApi {
  prefixUrl: string;
  storage: Storage;
  util: Util;
  router: typeof Router;

  url(url: string): RouterApi;
  static(path: string, router: string): RouterApi;
  usePrefix(): boolean;
  prefix(prefix: string): RouterApi;
  use(args: RouterApi[]): RouterApi;
  splitController(controllerString: string): SplitController;
  getArgs(arg: [ string, string ]): GetArgs;
  setRouter(method: MethodsRouter, arg: { url: string, controller: Controller, functionName: string }): void;
  get(url: string, controllerAndFunction: string): RouterApi;
  put(url: string, controllerAndFunction: string): RouterApi;
  post(url: string, controllerAndFunction: string): RouterApi;
  delete(url: string, controllerAndFunction: string): RouterApi;
  options(url: string, controllerAndFunction: string): RouterApi;
}

const RouterApiFunction = function () : RouterApi {};

export = RouterApiFunction;