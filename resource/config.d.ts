import { Server } from 'http';

interface ServerConfig {
  host: string;
  port: string;
}

class Config {
  load(): void;

  serverListen(): ServerConfig;
  createServer(middleware: typeof import('express')): Server;
}

export = Config;